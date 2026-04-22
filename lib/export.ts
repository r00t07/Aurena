import { Product } from '@/lib/supabase';

export const exportToCSV = (products: Product[]) => {
  // CSV Header
  const headers = [
    'ID',
    'Produktname',
    'Kategorie',
    'Farbe',
    'Material',
    'Bestand',
    'Preis (€)',
    'Verkauft',
    'Umsatz (€)',
    'Druckzeit (h)',
    'Hinzugefügt'
  ];

  // CSV Rows
  const rows = products.map(p => [
    p.id,
    p.name,
    p.category,
    p.color,
    p.material,
    p.quantity,
    p.price.toFixed(2),
    p.sold,
    (p.sold * p.price).toFixed(2),
    p.print_time,
    p.date_added
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportStatisticsToCSV = (products: Product[]) => {
  const stats = {
    totalProducts: products.length,
    totalInventory: products.reduce((sum, p) => sum + p.quantity, 0),
    totalSold: products.reduce((sum, p) => sum + p.sold, 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.sold * p.price), 0),
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
  };

  const categoryStats = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { count: 0, revenue: 0, sold: 0 };
    }
    acc[p.category].count++;
    acc[p.category].revenue += p.sold * p.price;
    acc[p.category].sold += p.sold;
    return acc;
  }, {} as Record<string, { count: number; revenue: number; sold: number }>);

  // Overall stats
  const overallContent = [
    'GESAMTSTATISTIK',
    '',
    'Kennzahl,Wert',
    `Gesamtprodukte,${stats.totalProducts}`,
    `Lagerbestand,${stats.totalInventory}`,
    `Verkaufte Einheiten,${stats.totalSold}`,
    `Gesamtumsatz,€${stats.totalRevenue.toFixed(2)}`,
    `Lagerwert,€${stats.totalValue.toFixed(2)}`,
    '',
    'KATEGORIEN',
    '',
    'Kategorie,Produkte,Verkauft,Umsatz',
    ...Object.entries(categoryStats).map(([cat, data]) => 
      `${cat},${data.count},${data.sold},€${data.revenue.toFixed(2)}`
    )
  ].join('\n');

  const blob = new Blob([overallContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `statistik_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
