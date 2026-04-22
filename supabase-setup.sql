-- ============================================
-- 3D PRINT INVENTORY - SUPABASE SETUP
-- ============================================
-- Kopiere dieses SQL in den Supabase SQL Editor
-- und führe es aus, um die Datenbank zu erstellen
-- ============================================

-- Erstelle die products Tabelle
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  sold INTEGER NOT NULL DEFAULT 0,
  print_time DECIMAL(10, 2) NOT NULL DEFAULT 0,
  material TEXT NOT NULL DEFAULT 'PLA',
  date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Erstelle einen Index für schnellere Suche
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);

-- Erstelle eine Funktion zum automatischen Update von updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Erstelle einen Trigger für updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Füge Beispiel-Daten ein (optional)
INSERT INTO products (id, name, category, color, quantity, price, sold, print_time, material, date_added)
VALUES
  ('001', 'Dragon Figurine', 'Figuren', 'Metallic Gold', 12, 24.99, 8, 6.5, 'PLA', '2024-01-15'),
  ('002', 'Phone Stand', 'Gadgets', 'Schwarz', 25, 9.99, 15, 2.0, 'PETG', '2024-02-01'),
  ('003', 'Keycaps Custom', 'Gaming', 'Neon Grün', 8, 14.99, 22, 1.5, 'Resin', '2024-01-20'),
  ('004', 'Planter Pot', 'Deko', 'Terracotta', 18, 12.99, 11, 3.0, 'PLA', '2024-02-10'),
  ('005', 'Cable Organizer', 'Gadgets', 'Weiß', 30, 6.99, 45, 1.0, 'PLA', '2024-01-05')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS (Row Level Security) Policies
-- ============================================
-- WICHTIG: Passe diese Policies an deine Sicherheitsanforderungen an!

-- Aktiviere RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann lesen (für öffentliche Demo)
-- ÄNDERN für Produktion: Nur authentifizierte User
CREATE POLICY "Enable read access for all users"
  ON products FOR SELECT
  USING (true);

-- Policy: Jeder kann einfügen (für öffentliche Demo)
-- ÄNDERN für Produktion: Nur authentifizierte User
CREATE POLICY "Enable insert for all users"
  ON products FOR INSERT
  WITH CHECK (true);

-- Policy: Jeder kann updaten (für öffentliche Demo)
-- ÄNDERN für Produktion: Nur authentifizierte User
CREATE POLICY "Enable update for all users"
  ON products FOR UPDATE
  USING (true);

-- Policy: Jeder kann löschen (für öffentliche Demo)
-- ÄNDERN für Produktion: Nur authentifizierte User
CREATE POLICY "Enable delete for all users"
  ON products FOR DELETE
  USING (true);

-- ============================================
-- ALTERNATIVE: Sichere Policies für Produktion
-- ============================================
-- Kommentiere die obigen Policies aus und nutze diese,
-- wenn du Authentifizierung aktiviert hast:
/*
-- Nur authentifizierte User können lesen
CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  USING (auth.role() = 'authenticated');

-- Nur authentifizierte User können einfügen
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Nur authentifizierte User können updaten
CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Nur authentifizierte User können löschen
CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');
*/

-- ============================================
-- FERTIG! Datenbank ist bereit für die App
-- ============================================
