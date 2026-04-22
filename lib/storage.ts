import { supabase, Product } from './supabase';

// Fetch all products from Supabase
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('date_added', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

// Add a new product to Supabase
export const addProduct = async (product: Omit<Product, 'created_at' | 'updated_at'>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to add product:', error);
    return null;
  }
};

// Update a product in Supabase
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to update product:', error);
    return null;
  }
};

// Delete a product from Supabase
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete product:', error);
    return false;
  }
};

// Update product quantity
export const updateProductQuantity = async (id: string, delta: number): Promise<Product | null> => {
  try {
    // Fetch current product
    const { data: currentProduct, error: fetchError } = await supabase
      .from('products')
      .select('quantity')
      .eq('id', id)
      .single();

    if (fetchError || !currentProduct) {
      console.error('Error fetching product for quantity update:', fetchError);
      return null;
    }

    const newQuantity = Math.max(0, currentProduct.quantity + delta);

    return await updateProduct(id, { quantity: newQuantity });
  } catch (error) {
    console.error('Failed to update quantity:', error);
    return null;
  }
};

// Mark product as sold
export const markProductAsSold = async (id: string): Promise<Product | null> => {
  try {
    // Fetch current product
    const { data: currentProduct, error: fetchError } = await supabase
      .from('products')
      .select('quantity, sold')
      .eq('id', id)
      .single();

    if (fetchError || !currentProduct) {
      console.error('Error fetching product for sale:', fetchError);
      return null;
    }

    if (currentProduct.quantity <= 0) {
      console.warn('Product out of stock');
      return null;
    }

    return await updateProduct(id, {
      quantity: currentProduct.quantity - 1,
      sold: currentProduct.sold + 1
    });
  } catch (error) {
    console.error('Failed to mark as sold:', error);
    return null;
  }
};

