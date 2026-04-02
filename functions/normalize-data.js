/**
 *  Changes data for charts from array of objects to array of arrays
 */
const normalizeData = (data = [{ primary: '', secondary: 0 }]) =>
  data.map((item) => {
    const normalized = [];
    normalized.push(item.primary, item.secondary);
    return normalized;
  });

export default normalizeData;
