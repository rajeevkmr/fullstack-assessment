// Helper function to extract numbers from a string
export const extractNumber = (value: string): number => {
  const match = value.match(/\d+(\.\d+)?/); // Matches integers or decimals
  return match ? parseFloat(match[0]) : 0; // Convert the matched number to a float
};
// Helper function to format dates
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
