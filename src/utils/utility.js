export const sortObjects = (property, order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}