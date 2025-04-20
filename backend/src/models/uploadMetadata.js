import mongoose from 'mongoose';

const uploadMetadataSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  processedRow: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('UploadMetadata', uploadMetadataSchema);
