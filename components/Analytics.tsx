'use client';

import { useMemo } from 'react';
import { Product } from '@/lib/supabase';

type AnalyticsProps = {
  products: Product[];
};

export default function Analytics({ products }: AnalyticsProps) {
  const analytics = useMemo(() => {
    // Category breakdown
    const categoryStats = products.reduce((acc, p) => {
      if (!acc[p.category]) {
        acc[p.category] = { count: 0, revenue: 0, sold: 0, inventory: 0 };
      }
      acc[p.category].count++;
      acc[p.category].revenue += p.sold * p.price;
      acc[p.category].sold += p.sold;
      acc[p.category].inventory += p.quantity;
      return acc;
    }, {} as Record<string, { count: number; revenue: number; sold: number; inventory: number }>);

    // Material breakdown
    const materialStats = products.reduce((acc, p) => {
      if (!acc[p.material]) {
        acc[p.material] = { count: 0, sold: 0 };
      }
      acc[p.material].count += p.quantity;
      acc[p.material].sold += p.sold;
      return acc;
    }, {} as Record<string, { count: number; sold: number }>);

    // Top sellers
    const topSellers = [...products]
      .sort((a, b) => (b.sold * b.price) - (a.sold * a.price))
      .slice(0, 5);

    // Low stock warning
    const lowStock = products.filter(p => p.quantity > 0 && p.quantity < 5);
    const outOfStock = products.filter(p => p.quantity === 0);

    // Average metrics
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length || 0;
    const avgPrintTime = products.reduce((sum, p) => sum + p.print_time, 0) / products.length || 0;

    return {
      categoryStats,
      materialStats,
      topSellers,
      lowStock,
      outOfStock,
      avgPrice,
      avgPrintTime
    };
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="border-2 border-[#00ff41]/30 p-6 text-center text-[#00ff41]/50">
        /// KEINE DATEN VERFÜGBAR
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border-2 border-[#00ff41] p-6 bg-[#0a0e27]/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff41] text-shadow-glow">/// KATEGORIEN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analytics.categoryStats).map(([category, stats]) => (
            <div key={category} className="border border-[#00ff41]/50 p-4 hover:bg-[#00ff41]/5 transition-all">
              <div className="text-lg font-bold mb-2">{category}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[#00ff41]/60">Produkte:</span> {stats.count}
                </div>
                <div>
                  <span className="text-[#00ff41]/60">Lager:</span> {stats.inventory}
                </div>
                <div>
                  <span className="text-[#00ff41]/60">Verkauft:</span> {stats.sold}
                </div>
                <div>
                  <span className="text-[#00ff41]/60">Umsatz:</span> {stats.revenue.toFixed(2)}€
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="border-2 border-[#00ff41] p-6 bg-[#0a0e27]/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff41] text-shadow-glow">/// MATERIALIEN</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(analytics.materialStats).map(([material, stats]) => (
            <div key={material} className="border border-[#00ff41]/50 p-3 text-center hover:bg-[#00ff41]/5 transition-all">
              <div className="font-bold text-lg">{material}</div>
              <div className="text-sm text-[#00ff41]/70 mt-2">
                <div>Lager: {stats.count}</div>
                <div>Verkauft: {stats.sold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Sellers */}
      <div className="border-2 border-[#00ff41] p-6 bg-[#0a0e27]/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff41] text-shadow-glow">/// TOP VERKÄUFE</h2>
        <div className="space-y-3">
          {analytics.topSellers.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between border border-[#00ff41]/50 p-3 hover:bg-[#00ff41]/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-[#00ff41]/50 w-8">#{index + 1}</div>
                <div>
                  <div className="font-bold">{product.name}</div>
                  <div className="text-sm text-[#00ff41]/60">{product.category} • {product.color}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{(product.sold * product.price).toFixed(2)}€</div>
                <div className="text-sm text-[#00ff41]/60">{product.sold} verkauft</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {(analytics.lowStock.length > 0 || analytics.outOfStock.length > 0) && (
        <div className="border-2 border-[#ffaa00] p-6 bg-[#0a0e27]/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-[#ffaa00] drop-shadow-[0_0_10px_rgba(255,170,0,0.5)]">/// WARNUNGEN</h2>
          
          {analytics.outOfStock.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2 text-[#ff4444]">[!] AUSVERKAUFT ({analytics.outOfStock.length})</h3>
              <div className="flex flex-wrap gap-2">
                {analytics.outOfStock.map(p => (
                  <span key={p.id} className="border border-[#ff4444] px-3 py-1 text-sm text-[#ff4444]">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analytics.lowStock.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-2 text-[#ffaa00]">[!] NIEDRIGER BESTAND ({analytics.lowStock.length})</h3>
              <div className="flex flex-wrap gap-2">
                {analytics.lowStock.map(p => (
                  <span key={p.id} className="border border-[#ffaa00] px-3 py-1 text-sm text-[#ffaa00]">
                    {p.name} ({p.quantity})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Average Metrics */}
      <div className="border-2 border-[#00ff41] p-6 bg-[#0a0e27]/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff41] text-shadow-glow">/// DURCHSCHNITT</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-[#00ff41]/50 p-4 text-center">
            <div className="text-[#00ff41]/60 text-sm mb-1">Preis</div>
            <div className="text-2xl font-bold">{analytics.avgPrice.toFixed(2)}€</div>
          </div>
          <div className="border border-[#00ff41]/50 p-4 text-center">
            <div className="text-[#00ff41]/60 text-sm mb-1">Druckzeit</div>
            <div className="text-2xl font-bold">{analytics.avgPrintTime.toFixed(1)}h</div>
          </div>
          <div className="border border-[#00ff41]/50 p-4 text-center">
            <div className="text-[#00ff41]/60 text-sm mb-1">Verkaufsrate</div>
            <div className="text-2xl font-bold">
              {((products.reduce((sum, p) => sum + p.sold, 0) / 
                 (products.reduce((sum, p) => sum + p.quantity, 0) + products.reduce((sum, p) => sum + p.sold, 0))) * 100 || 0).toFixed(0)}%
            </div>
          </div>
          <div className="border border-[#00ff41]/50 p-4 text-center">
            <div className="text-[#00ff41]/60 text-sm mb-1">Ø Umsatz/Produkt</div>
            <div className="text-2xl font-bold">
              {(products.reduce((sum, p) => sum + (p.sold * p.price), 0) / products.length || 0).toFixed(2)}€
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
