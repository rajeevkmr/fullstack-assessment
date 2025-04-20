import React, { useEffect, useState } from 'react';
import HomeView from './home.view';
import HomeService from './home.service';

interface SalesRecord {
  transactionId: string;
  customerName: string;
  product: string;
  quantity: number;
  price: string;
  orderDate: string;
  // Add other fields as per the structure of your sales data
}
const Home: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [filters, setFilters] = useState<{
    customerName: string;
    productName: string;
  }>({
    customerName: 'All',
    productName: 'All',
  });

  const rowsPerPage = 10;

  const fetchSalesData = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await HomeService.getSalesData(
        currentPage,
        rowsPerPage,
        filters.customerName === 'All' ? '' : filters.customerName,
        filters.productName === 'All' ? '' : filters.productName
      );
      setSalesData(response.data.records || []);
      setCustomerList(response.data.customerList || []);
      setProductList(response.data.productList || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError('Failed to fetch sales data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSalesData(currentPage);
  }, [currentPage, filters]);

  const handleUpdateData = (currentPage: number) => {
    setCurrentPage(currentPage);
  };
  const handleFilterChange = (newFilters: {
    customerName: string;
    productName: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  return (
    <HomeView
      data={salesData}
      totalPages={totalPages}
      cbForUpdateddate={handleUpdateData}
      currentPage={currentPage}
      onFilterChange={handleFilterChange}
      customerList={customerList}
      productList={productList}
      filters={filters}
    />
  );
};

export default Home;
