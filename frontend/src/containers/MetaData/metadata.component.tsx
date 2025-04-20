import { FC, useEffect, useState } from 'react';
import MetadataService from './metadata.service';
import MetadataView from './metadata.view';

interface MetaRecord {
  fileName: string;
  processedRow: string;
  uploadDate: string;
}
const Metadata: FC = () => {
  const [metaData, setMetaData] = useState<MetaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await MetadataService.getMetadata();
        setMetaData(response.data.records || []);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to fetch sales data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []); // Empty dependency array ensures the effect runs only once
  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  return <MetadataView data={metaData} />;
};
export default Metadata;
