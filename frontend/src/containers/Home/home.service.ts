import { getRequest } from '../../services/apiService';
class HomeService {
  static async getSalesData(
    page: number,
    rowsPerPage: number,
    customerName: string,
    productName: string
  ) {
    const reqParams: {
      page: number;
      limit: number;
      customerName?: string;
      product?: string;
    } = {
      page: page, // Current page number
      limit: rowsPerPage,
    };
    if (customerName !== '') {
      reqParams.customerName = customerName; // Customer name filter
    }
    if (productName !== '') {
      reqParams.product = productName; // Customer name filter
    }
    const response = await getRequest('/sales', reqParams);
    return response;
  }
}
export default HomeService;
