import fs from 'fs';
import csv from 'csv-parser';
import multer from 'multer';
import Sales from '../models/salesModel.js';
import UploadMetadata from '../models/uploadMetadata.js';
import { successResponse, errorResponse } from '../services/responseService.js';

// Configure Multer to store files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
const upload = multer({ storage });

// POST /api/upload CSV file
const uploadFile = async (req, res) => {
  const results = [];
  let rowCount = 0; // Initialize a counter for rows
  const fileName = req.file.filename; // Get the file name
  const filePath = req.file.path; // Multer stores the file path in req.file.path

  // Define a mapping between CSV headers and Mongoose model fields
  const csvToModelMapping = {
    'Transaction Id': 'transactionId',
    'Customer Name': 'customerName',
    Product: 'product',
    Quantity: 'quantity',
    Price: 'price',
    Date: 'orderDate',
  };

  fs.createReadStream(filePath)
    .pipe(
      csv({
        mapHeaders: ({ header }) => header.trim(), // Trim spaces from headers
      })
    )
    .on('data', async (row) => {
      rowCount++; // Increment the row counter for each row
      // Transform the row to match the model field names
      const transformedRow = {};
      for (const [csvHeader, modelField] of Object.entries(csvToModelMapping)) {
        transformedRow[modelField] = row[csvHeader];
      }

      results.push(transformedRow);
      try {
        // Create a new instance of the Sales model
        const salesEntry = new Sales(transformedRow);

        // Save the instance to the database
        await salesEntry.save();
        console.log('Row saved successfully');
      } catch (err) {
        console.error('Error saving row:', err);
      }
    })
    .on('end', async () => {
      console.log(`CSV parsing completed. Total rows processed: ${rowCount}`);
      fs.unlinkSync(filePath); // Clean up

      // Save metadata to the database
      try {
        const metadata = new UploadMetadata({
          fileName: fileName,
          processedRow: rowCount,
          uploadDate: new Date(),
        });
        await metadata.save();
        console.log('Metadata saved successfully');
      } catch (err) {
        console.error('Error saving metadata:', err);
        return errorResponse(res, 'Failed to save metadata', err);
      }
      return successResponse(res, 'File processed successfully', {
        totalRows: rowCount,
        data: results,
      });
    })
    .on('error', (err) => {
      console.error(err);
      return errorResponse(res, 'Failed to process CSV', err);
    });
};

export { upload, uploadFile };
