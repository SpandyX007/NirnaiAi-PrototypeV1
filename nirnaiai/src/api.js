// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to refresh the token if expired
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and hasn't already been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken
        });
        
        // If refresh successful, save the new tokens
        localStorage.setItem('access_token', response.data.access);
        
        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return apiClient(originalRequest);
      } catch (err) {
        // If refresh fails, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username, password) => {
    const response = await apiClient.post('token/', { username, password });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  },
  
  register: async (userData) => {
    return apiClient.post('users/register/', userData);
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  getCurrentUser: async () => {
    return apiClient.get('users/me/');
  },
};

// Legal rights services
export const rightsService = {
  getCategories: () => {
    return apiClient.get('legal/categories/');
  },
  
  getCategoryBySlug: (slug) => {
    return apiClient.get(`legal/categories/${slug}/`);
  },
  
  getRightsByCategory: (slug) => {
    return apiClient.get(`legal/categories/${slug}/rights/`);
  },
  
  getRights: (filters = {}) => {
    return apiClient.get('legal/rights/', { params: filters });
  },
  
  getRightBySlug: (slug) => {
    return apiClient.get(`legal/rights/${slug}/`);
  },
  
  searchRights: (query) => {
    return apiClient.get('legal/rights/', { params: { search: query } });
  },
};

// Documents services
export const documentsService = {
  getDocuments: (filters = {}) => {
    return apiClient.get('legal/documents/', { params: filters });
  },
  
  getDocumentBySlug: (slug) => {
    return apiClient.get(`legal/documents/${slug}/`);
  }
};

// Contact and help services
export const contactService = {
  submitInquiry: (inquiryData) => {
    return apiClient.post('legal/inquiries/', inquiryData);
  },
  
  getUserInquiries: () => {
    return apiClient.get('legal/inquiries/');
  },
  
  getLocalHelp: (filters = {}) => {
    return apiClient.get('users/local-help/', { params: filters });
  },
  
  getCommonIssues: () => {
    return apiClient.get('legal/common-issues/');
  }
};

// export default {
//   auth: authService,
//   rights: rightsService,
//   documents: documentsService,
//   contact: contactService
// };

// src/services/api.js (add these service functions to your existing api.js)

// Case services
export const caseService = {
  searchCases: (searchParams) => {
    return apiClient.post('legal/cases/search/', searchParams);
  },
  
  getCaseById: (id) => {
    return apiClient.get(`legal/cases/${id}/`);
  },
  
  getCourts: () => {
    return apiClient.get('legal/courts/');
  },
  
  getBenches: (courtId) => {
    const params = courtId ? { court: courtId } : {};
    return apiClient.get('legal/benches/', { params });
  },
  
  getUserCaseCollections: () => {
    return apiClient.get('legal/case-collections/');
  },
  
  addToCollection: (caseId, notes = '') => {
    return apiClient.post('legal/case-collections/', {
      case: caseId,
      notes: notes
    });
  },
  
  removeFromCollection: (collectionId) => {
    return apiClient.delete(`legal/case-collections/${collectionId}/`);
  }
};

// Update the default export to include the case service
export default {
  auth: authService,
  rights: rightsService,
  documents: documentsService,
  contact: contactService,
  cases: caseService
};