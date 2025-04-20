import React, { useState } from 'react';
import { DataGrid } from 'react-data-grid';
import { extractNumber, formatDate } from '../../utils/utils';

type iProps = {
  data: {
    transactionId: string;
    customerName: string;
    product: string;
    quantity: number;
    price: string; // Price is a string that may contain numbers and other characters
    orderDate: string;
  }[];
  totalPages: number;
  cbForUpdateddate: (currentPage: number) => void;
  currentPage: number; // Current page state
  onFilterChange: (filters: {
    customerName: string;
    productName: string;
  }) => void; // Callback for filter changes
  customerList: string[];
  productList: string[];
  filters: {
    customerName: string;
    productName: string;
  };
};

const HomeView: React.FC<iProps> = ({
  data,
  cbForUpdateddate,
  currentPage,
  totalPages,
  onFilterChange,
  customerList,
  productList,
  filters,
}) => {
  const [customerFilter, setCustomerFilter] = useState<string>(
    filters.customerName != 'All' ? filters.customerName : 'All'
  ); // State for customer filter
  const [productFilter, setProductFilter] = useState<string>(
    filters.productName != 'All' ? filters.productName : 'All'
  ); // State for product filter

  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  // Filter rows based on search term
  const filteredRows = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.transactionId.toLowerCase().includes(searchLower) || // Search in Transaction ID
      item.customerName.toLowerCase().includes(searchLower) || // Search in Customer Name
      item.product.toLowerCase().includes(searchLower) // Search in Product Name
    );
  });

  const columns = [
    { key: 'id', name: 'Transaction Id' },
    { key: 'name', name: 'Customer Name' },
    { key: 'product', name: 'Product Name' },
    { key: 'quantity', name: 'Quantity' },
    { key: 'price', name: 'Price' },
    { key: 'total', name: 'Total' },
    { key: 'date', name: 'Date' },
  ];

  const rows = filteredRows.map((item) => ({
    id: item.transactionId,
    name: item.customerName,
    product: item.product,
    quantity: item.quantity,
    price: item.price,
    total: extractNumber(item.price) * item.quantity + ' USD', // Calculate total
    date: formatDate(item.orderDate), // Parse date string
  }));

  const handleCustomerFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCustomerFilter = e.target.value;
    setCustomerFilter(newCustomerFilter);
    onFilterChange({
      customerName: newCustomerFilter,
      productName: productFilter,
    });
  };

  const handleProductFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProductFilter = e.target.value;
    setProductFilter(newProductFilter);
    onFilterChange({
      customerName: customerFilter,
      productName: newProductFilter,
    });
  };

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  // Calculate grid height dynamically based on the number of rows
  const rowHeight = 35; // Approximate height of each row in pixels
  const headerHeight = 45; // Approximate height of the header in pixels
  const gridHeight = Math.min(300, rows.length * rowHeight + headerHeight); // Cap height at 400px

  // Pagination logic
  const totalPagesCount = totalPages;

  const handlePageChange = (newPage: number) => {
    cbForUpdateddate(newPage);
  };

  return (
    <div className='w-75 mx-auto mt-5'>
      <h1 className='text-center'>Welcome to Nokia AIIMS</h1>
      <h2 className='text-center'>Sales Data</h2>
      {/* Customer Filter Dropdown */}
      <div className='d-flex w-100 mb-4'>
        <div className='mx-2 w-25'>
          <label htmlFor='customerFilter' className='form-label'>
            Filter by Customer Name:
          </label>
          <select
            id='customerFilter'
            className='form-select'
            value={customerFilter}
            onChange={handleCustomerFilterChange}
          >
            <option value='All'>All</option>
            {customerList.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className='d-flex w-75'>
          <div className='w-50' style={{ paddingRight: '10px' }}>
            <label htmlFor='productFilter' className='form-label'>
              Filter by Product Name:
            </label>
            <select
              id='productFilter'
              className='form-select'
              value={productFilter}
              onChange={handleProductFilterChange}
            >
              <option value='All'>All</option>
              {productList.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div className='w-50'>
            <label htmlFor='search' className='form-label'>
              Search:
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Search transaction, product, customer...'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      {/* Conditional Rendering for Empty Data */}
      {rows.length === 0 ? (
        <div className='text-center'>
          <p>
            No data available. Please adjust your filters or try again later.
          </p>
          <a href='/upload' className='btn btn-primary'>
            Upload Data
          </a>
        </div>
      ) : (
        <>
          <DataGrid
            columns={columns}
            rows={rows}
            bottomSummaryRows={[]}
            style={{ height: `${gridHeight + 20}px` }}
          />
          {/* Pagination Controls */}
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <button
              className='btn btn-secondary'
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPagesCount}
            </span>
            <button
              className='btn btn-secondary'
              disabled={currentPage === totalPagesCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeView;
