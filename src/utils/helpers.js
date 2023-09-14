export const formatPrice = number => {
  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD'
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let uniqueItem = data.map(item => {
    return item[type];
  });
  if (type === 'colors') {
    uniqueItem = uniqueItem.flat(); //flat nested array
  }
  return ['all', ...new Set(uniqueItem)];
};
