import { useState } from 'react';
import axios from 'axios';
import { postRequest } from '../services/apiService';

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const formData = new FormData();
      formData.append('file', file); // Append the file to the form data

      // Make the API request to upload the file
      const response = await postRequest('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });

      // Handle success response
      console.log('File uploaded successfully:', response.data);
      return response.data; // Return the response data
    } catch (err: unknown) {
      // Narrow the type of 'err' to 'AxiosError'
      if (axios.isAxiosError(err)) {
        console.error('Error uploading file:', err);
        setError(err.response?.data?.message || 'Failed to upload file');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      }
      throw err; // Re-throw the error for further handling
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return { uploadFile, isLoading, error };
};

export default useUploadFile;
