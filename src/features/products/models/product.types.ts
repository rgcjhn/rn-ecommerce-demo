// Product data structure from DummyJSON API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// API response format for products list
export interface ProductsApiResponse {
  products: Product[];
  total: number; // Total available products
  skip: number; // Items skipped for pagination
  limit: number; // Items per page
}

// Request parameters for fetching products
export interface ProductsQueryParams {
  limit?: number; // How many items to get
  skip?: number; // How many items to skip
  select?: string; // Which fields to return
}

// Error response structure
export interface ProductsError {
  status: number;
  data: {
    message: string;
  };
}
