export const groupByCategory = (communities) => {
  const dateArr = [];
  const keyHolder = [];
  if (communities) {
    communities.forEach((item) => {
      keyHolder[item.category] = keyHolder[item.category] || {};
      const obj = keyHolder[item.category];
      if (Object.keys(obj).length === 0) dateArr.push(obj);
      obj.title = item.category;
      obj.data = obj.data || [];
      obj.data.push(item);
    });
  }
  return dateArr;
};

export default groupByCategory;
