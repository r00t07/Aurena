'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, addProduct as addProductToDB, updateProduct, deleteProduct as deleteProductFromDB, updateProductQuantity, markProductAsSold } from '@/lib/storage';
import { exportToCSV, exportStatisticsToCSV } from '@/lib/export';
import Analytics from '@/components/Analytics';
import { Product } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    color: '',
    quantity: 0,
    price: 0,
    sold: 0,
    print_time: 0,
    material: 'PLA',
  });
  const [activeTab, setActiveTab] = useState<'products' | 'analytics'>('products');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalProducts: products.length,
    totalInventory: products.reduce((sum, p) => sum + p.quantity, 0),
    totalSold: products.reduce((sum, p) => sum + p.sold, 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.sold * p.price), 0),
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
  };

  // Load products from Supabase on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category) return;
    
    const product: Omit<Product, 'created_at' | 'updated_at'> = {
      id: String(Date.now()).slice(-9).padStart(3, '0'),
      name: newProduct.name,
      category: newProduct.category,
      color: newProduct.color || 'Standard',
      quantity: newProduct.quantity || 0,
      price: newProduct.price || 0,
      sold: newProduct.sold || 0,
      print_time: newProduct.print_time || 0,
      material: newProduct.material || 'PLA',
      date_added: new Date().toISOString().split('T')[0]
    };
    
    const added = await addProductToDB(product);
    if (added) {
      await loadProducts();
      setShowAddForm(false);
      setNewProduct({
        name: '',
        category: '',
        color: '',
        quantity: 0,
        price: 0,
        sold: 0,
        print_time: 0,
        material: 'PLA',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const success = await deleteProductFromDB(id);
    if (success) {
      await loadProducts();
    }
  };

  const handleUpdateQuantity = async (id: string, delta: number) => {
    await updateProductQuantity(id, delta);
    await loadProducts();
  };

  const handleMarkAsSold = async (id: string) => {
    await markProductAsSold(id);
    await loadProducts();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0e27] text-[#00ff41] p-4 md:p-8 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-glow">▲</div>
          <div className="text-xl animate-pulse">/// LADE DATEN...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e27] text-[#00ff41] p-4 md:p-8 font-mono">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41] to-transparent animate-scan"></div>
      </div>

      {/* Header */}
      <header className="mb-8 border-2 border-[#00ff41] p-6 bg-[#0a0e27]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,65,0.3)] animate-fadeIn">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 border-2 border-[#00ff41] flex items-center justify-center text-2xl animate-pulse-glow">
            ▲
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-wider text-shadow-glow">3D PRINT INVENTORY</h1>
            <p className="text-[#00ff41]/70 text-sm mt-1">/// SYSTEM v2.0 — SUPABASE CONNECTED</p>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { label: 'PRODUKTE', value: stats.totalProducts, unit: '' },
            { label: 'LAGER', value: stats.totalInventory, unit: ' STK' },
            { label: 'VERKAUFT', value: stats.totalSold, unit: ' STK' },
            { label: 'UMSATZ', value: stats.totalRevenue.toFixed(2), unit: ' €' },
            { label: 'LAGERWERT', value: stats.totalValue.toFixed(2), unit: ' €' },
          ].map((stat, i) => (
            <div key={i} className="border border-[#00ff41]/50 p-3 bg-[#0a0e27]/60 hover:bg-[#00ff41]/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-[#00ff41]/60 text-xs mb-1">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}{stat.unit}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 animate-fadeIn" style={{ animationDelay: '0.25s' }}>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 border-2 px-6 py-3 font-bold tracking-wider transition-all duration-300 ${
            activeTab === 'products'
              ? 'border-[#00ff41] bg-[#00ff41] text-[#0a0e27] shadow-[0_0_20px_rgba(0,255,65,0.6)]'
              : 'border-[#00ff41]/50 text-[#00ff41] hover:border-[#00ff41] hover:bg-[#00ff41]/10'
          }`}
        >
          [#] PRODUKTE
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 border-2 px-6 py-3 font-bold tracking-wider transition-all duration-300 ${
            activeTab === 'analytics'
              ? 'border-[#00ff41] bg-[#00ff41] text-[#0a0e27] shadow-[0_0_20px_rgba(0,255,65,0.6)]'
              : 'border-[#00ff41]/50 text-[#00ff41] hover:border-[#00ff41] hover:bg-[#00ff41]/10'
          }`}
        >
          [%] ANALYTICS
        </button>
      </div>

      {/* Controls */}
      {activeTab === 'products' && (
        <div className="mb-6 flex flex-col md:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex-1">
            <input
              type="text"
              placeholder="SUCHEN [NAME / FARBE]..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0e27] border-2 border-[#00ff41] px-4 py-3 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.5)] transition-all"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#0a0e27] border-2 border-[#00ff41] px-4 py-3 text-[#00ff41] focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.5)] cursor-pointer transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-[#0a0e27]">
                {cat === 'all' ? 'ALLE KATEGORIEN' : cat.toUpperCase()}
              </option>
            ))}
          </select>

          <button
            onClick={() => exportToCSV(products)}
            className="border-2 border-[#00ff41] px-6 py-3 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all duration-300 font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,65,0.3)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] whitespace-nowrap"
            title="Produktliste als CSV exportieren"
          >
            [↓] CSV
          </button>

          <button
            onClick={() => exportStatisticsToCSV(products)}
            className="border-2 border-[#00ff41] px-6 py-3 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all duration-300 font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,65,0.3)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] whitespace-nowrap"
            title="Statistiken als CSV exportieren"
          >
            [↓] STATS
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="border-2 border-[#00ff41] px-6 py-3 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all duration-300 font-bold tracking-wider shadow-[0_0_10px_rgba(0,255,65,0.3)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]"
          >
            {showAddForm ? '[X] SCHLIESSEN' : '[+] NEU'}
          </button>
        </div>
      )}

      {/* Add Product Form */}
      {activeTab === 'products' && showAddForm && (
        <div className="mb-6 border-2 border-[#00ff41] p-6 bg-[#0a0e27]/90 animate-slideDown">
          <h2 className="text-xl font-bold mb-4 text-[#00ff41]">/// NEUES PRODUKT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Produktname"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <input
              type="text"
              placeholder="Kategorie"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <input
              type="text"
              placeholder="Farbe"
              value={newProduct.color}
              onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <select
              value={newProduct.material}
              onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] focus:outline-none focus:border-[#00ff41] cursor-pointer"
            >
              <option value="PLA">PLA</option>
              <option value="PETG">PETG</option>
              <option value="ABS">ABS</option>
              <option value="TPU">TPU</option>
              <option value="Resin">Resin</option>
            </select>
            <input
              type="number"
              placeholder="Anzahl"
              value={newProduct.quantity || ''}
              onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 0})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Preis (€)"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Druckzeit (h)"
              value={newProduct.print_time || ''}
              onChange={(e) => setNewProduct({...newProduct, print_time: parseFloat(e.target.value) || 0})}
              className="bg-[#0a0e27] border border-[#00ff41]/50 px-3 py-2 text-[#00ff41] placeholder-[#00ff41]/40 focus:outline-none focus:border-[#00ff41]"
            />
            <button
              onClick={handleAddProduct}
              className="border-2 border-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all duration-300 font-bold"
            >
              SPEICHERN
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'products' ? (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product, index) => {
              const stockStatus = product.quantity === 0 ? 'AUSVERKAUFT' : 
                                 product.quantity < 5 ? 'NIEDRIG' : 'OK';
              const stockColor = product.quantity === 0 ? '#ff4444' : 
                                product.quantity < 5 ? '#ffaa00' : '#00ff41';

              return (
                <div
                  key={product.id}
                  className="border-2 border-[#00ff41] p-4 bg-[#0a0e27]/70 hover:bg-[#00ff41]/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] animate-fadeIn group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-[#00ff41]/30">
                    <div>
                      <div className="text-[#00ff41]/50 text-xs">ID #{product.id}</div>
                      <h3 className="text-xl font-bold mt-1 group-hover:text-shadow-glow transition-all">{product.name}</h3>
                      <div className="text-sm text-[#00ff41]/70 mt-1">
                        <span className="border border-[#00ff41]/50 px-2 py-0.5 mr-2">{product.category}</span>
                        <span>{product.color}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{product.price.toFixed(2)}€</div>
                      <div className="text-xs text-[#00ff41]/60">{product.material}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                    <div>
                      <div className="text-[#00ff41]/50 text-xs">LAGER</div>
                      <div className="font-bold flex items-center gap-1">
                        <span style={{ color: stockColor }}>{product.quantity}</span>
                        <span className="text-xs" style={{ color: stockColor }}>[{stockStatus}]</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#00ff41]/50 text-xs">VERKAUFT</div>
                      <div className="font-bold">{product.sold}</div>
                    </div>
                    <div>
                      <div className="text-[#00ff41]/50 text-xs">UMSATZ</div>
                      <div className="font-bold">{(product.sold * product.price).toFixed(2)}€</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-[#00ff41]/50">Druckzeit:</span> {product.print_time}h
                    </div>
                    <div>
                      <span className="text-[#00ff41]/50">Hinzugefügt:</span> {product.date_added}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-[#00ff41]/30">
                    <button
                      onClick={() => handleUpdateQuantity(product.id, 1)}
                      className="flex-1 border border-[#00ff41] px-3 py-2 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all text-xs font-bold"
                      title="Bestand erhöhen"
                    >
                      [+1]
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(product.id, -1)}
                      className="flex-1 border border-[#00ff41] px-3 py-2 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all text-xs font-bold"
                      title="Bestand verringern"
                    >
                      [-1]
                    </button>
                    <button
                      onClick={() => handleMarkAsSold(product.id)}
                      disabled={product.quantity === 0}
                      className="flex-1 border border-[#00ff41] px-3 py-2 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-all text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Als verkauft markieren"
                    >
                      [VERKAUFT]
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="border border-[#ff4444] px-3 py-2 hover:bg-[#ff4444] hover:text-[#0a0e27] transition-all text-xs font-bold text-[#ff4444] hover:text-[#0a0e27]"
                      title="Produkt löschen"
                    >
                      [X]
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-[#00ff41]/50 text-xl border-2 border-[#00ff41]/30 animate-pulse-slow">
              /// KEINE PRODUKTE GEFUNDEN
            </div>
          )}
        </>
      ) : (
        <Analytics products={products} />
      )}
    </main>
  );
}
