import React, { useState } from 'react';
import useUploadFile from '../../hooks/fileupload'; // Custom hook for file upload

const UploadView = () => {
  const { uploadFile, isLoading, error } = useUploadFile(); // Custom hook for file upload
  const [file, setFile] = useState<File | null>(null); // State to store the selected file
  const [isUploading, setIsUploading] = useState(false); // State to track upload status
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setSuccessMessage(null); // Clear success message when a new file is selected
    }
  };

  // Handle file upload
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    if (file) {
      setIsUploading(true);
      setSuccessMessage(null); // Clear previous success message
      try {
        console.log('file', file);
        await uploadFile(file); // Call the upload function
        setFile(null); // Clear the file input
        setSuccessMessage('File uploaded successfully!'); // Set success message
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setIsUploading(false); // Reset uploading state
      }
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Upload New Data</h2>
      <form onSubmit={handleUpload}>
        <div className='mb-3'>
          <label htmlFor='fileInput' className='form-label'>
            Select a CSV file to upload:
          </label>
          <input
            type='file'
            id='fileInput'
            className='form-control'
            onChange={handleFileChange}
            accept='.csv' // Restrict file type to CSV
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        {isLoading && <p className='text-info mt-3'>Loading...</p>}
        {error && <p className='text-danger mt-3'>Error: {error}</p>}
        {successMessage && (
          <p className='text-success mt-3'>{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default UploadView;
