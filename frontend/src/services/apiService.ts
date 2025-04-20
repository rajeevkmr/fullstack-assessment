import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the environment variable
  timeout: 10000, // Request timeout in milliseconds
});

// Centralized error handler
import { AxiosError } from 'axios';

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with a status code other than 200
    console.error(`API Error [${error.response.status}]:`, error.response.data);
    const errorMessage =
      (error.response.data as { message?: string })?.message ||
      `Error: ${error.response.status}`;
    toast.error(errorMessage); // Show error as toast
    throw new Error(errorMessage);
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received:', error.request);
    const errorMessage = 'No response from the server. Please try again later.';
    toast.error(errorMessage); // Show error as toast
    throw new Error(errorMessage);
  } else {
    // Something else happened
    console.error('Unexpected Error:', error.message);
    const errorMessage =
      'An unexpected error occurred. Please try again later.';
    toast.error(errorMessage); // Show error as toast
    throw new Error(errorMessage);
  }
};

// Axios response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If the response status is 200, return the response
    if (response.status === 200) {
      return response.data;
    }
    // Handle non-200 status codes
    const errorMessage = `Unexpected status code: ${response.status}`;
    // toast.error(errorMessage); // Show error as toast
    throw new Error(errorMessage);
  },
  (error) => {
    // Handle errors globally
    console.error('API Error service:', error);
    handleApiError(error);
  }
);

// Common GET request
export const getRequest = async (
  url: string,
  params: Record<string, string | number | boolean | null | undefined> = {}
) => {
  return apiClient.get(url, { params });
};

export const postRequest = async (
  url: string,
  data: Record<string, unknown> | FormData,
  config: Record<string, unknown> = {}
) => {
  // Check if the data is FormData and set the appropriate headers
  const headers =
    data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
  return apiClient.post(url, data, {
    ...config,
    headers: {
      ...headers,
      ...(typeof config.headers === 'object' && config.headers
        ? config.headers
        : {}),
    },
  });
};
