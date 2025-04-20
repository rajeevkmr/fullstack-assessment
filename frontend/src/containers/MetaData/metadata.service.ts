import { getRequest } from '../../services/apiService';
class MetadataService {
  static async getMetadata() {
    const response = await getRequest('/sales/upload-history');
    return response;
  }
}

export default MetadataService;
