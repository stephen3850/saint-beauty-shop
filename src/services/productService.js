import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    // Added trailing slash to match FastAPI route definition and avoid CORS redirect issues
    const { data } = await api.get('/api/products/', { params });
    // FastAPI returns { success: true, data: { products: [], page, pages, total } }
    return data.data.products;
  },

  getProductById: async (id) => {
    const { data } = await api.get(`/api/products/${id}`);
    return data.data;
  },

  getCategories: async () => {
    const { data } = await api.get('/api/products/categories');
    return data.data;
  },

  addProduct: async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images' && Array.isArray(productData[key])) {
        productData[key].forEach(image => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    const { data } = await api.post('/api/products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
  },

  updateProduct: async (id, productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images' && Array.isArray(productData[key])) {
        productData[key].forEach(image => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    const { data } = await api.put(`/api/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
  },

  deleteProduct: async (id) => {
    const { data } = await api.delete(`/api/products/${id}`);
    return data.success;
  }
};
