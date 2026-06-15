export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatStatus = (status) => {
  const statusMap = {
    pending: { label: 'Pending', color: 'yellow' },
    confirmed: { label: 'Confirmed', color: 'blue' },
    shipped: { label: 'Shipped', color: 'purple' },
    delivered: { label: 'Delivered', color: 'green' },
    cancelled: { label: 'Cancelled', color: 'red' },
  };
  return statusMap[status] || { label: status, color: 'gray' };
};