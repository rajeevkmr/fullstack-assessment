import fs from 'fs';
import csv from 'csv-parser';
import multer from 'multer';
import Sales from '../models/salesModel.js';
import { successResponse, errorResponse } from '../services/responseService.js';
import UploadMetadata from '../models/uploadMetadata.js';

// GET /api/sales
const getSales = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { page = 1, limit = 10, ...filters } = req.query; // Destructure and exclude `page` and `limit`

    const pageNumber = parseInt(page); // Convert page to an integer
    const limitNumber = parseInt(limit); // Convert limit to an integer
    const skip = (pageNumber - 1) * limitNumber; // Calculate the number of records to skip

    // Get the total count of records for pagination metadata
    const totalRecords = await Sales.countDocuments(filters);

    await Sales.find(filters)
      .skip(skip) // Skip records for pagination
      .limit(limitNumber)
      .then(async (records) => {
        // Sort the records by date in descending order
        // Return the filtered sales records
        return successResponse(res, 'Sales records fetched successfully', {
          totalRecords,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalRecords / limitNumber),
          records,
          customerList: await getUniqueCustomers(),
          productList: await getUniqueProducts(),
        });
      });
  } catch (error) {
    console.error('Error fetching sales records:', error);
    return errorResponse(res, 'Error fetching sales records', error);
  }
};

// GET /api/upload-metadata
const getUploadHistory = async (req, res) => {
  try {
    // Extract pagination parameters from the request
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    // Fetch metadata records with pagination
    const metadataRecords = await UploadMetadata.find()
      .skip(skip) // Skip records for pagination
      .limit(limit); // Limit the number of records returned

    // Get the total count of metadata records
    const totalRecords = await UploadMetadata.countDocuments();

    // Return the metadata records with pagination metadata
    return successResponse(res, 'Upload metadata fetched successfully', {
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      records: metadataRecords,
    });
  } catch (error) {
    console.error('Error fetching upload metadata:', error);
    return errorResponse(res, 'Error fetching upload metadata', error);
  }
};

// GET /api/sales/customers
const getUniqueCustomers = async () => {
  try {
    // Use MongoDB's distinct method to get unique customer names
    const uniqueCustomers = await Sales.distinct('customerName');
    console.log('Unique customers:', uniqueCustomers);
    return uniqueCustomers;
  } catch (error) {
    console.error('Error fetching unique customer names:', error);
  }
};

// GET /api/sales/products
const getUniqueProducts = async () => {
  try {
    // Use MongoDB's distinct method to get unique product names
    return await Sales.distinct('product');
  } catch (error) {
    console.error('Error fetching unique product names:', error);
  }
};
export { getSales, getUploadHistory };
