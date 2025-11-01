// This is the URL where your Flask backend is running
const BASE_URL = 'http://127.0.0.1:5000/api';

// Define a type for the product data
// This should match the fields your backend expects
interface NewProduct {
  name: string;
  description: string;
  wholesale_price: number;
  msrp: number;
  manufacturer_stock: number;
}

/**
 * Calls the backend API to create a new product.
 * @param productData The data for the new product
 */
export const createProduct = async (productData: NewProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    // Get the response from the server
    const result = await response.json();

    if (!response.ok) {
      // If the server returned an error (e.g., 400, 500)
      throw new Error(result.error || 'Failed to create product');
    }

    // Return the successful response (e.g., { message: "...", inserted_id: "..." })
    return result;

  } catch (error) {
    console.error('Error in createProduct service:', error);
    // Rethrow the error so the component can catch it
    throw error;
  }
};