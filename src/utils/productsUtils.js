const convertDataBySelectedFilters = (data, filters) => {
  const _filters = filters.filter(
    (item) => item.value !== null && item.value !== ""
  );

  if (_filters.length === 0) return data;

  return data.filter((item) => {
    return _filters.every((f) => {
      if (f.type === "select") {
        return item[f.name] === f.value;
      } else {
        return item[f.name].toString().includes(f.value);
      }
    });
  });
};

export { convertDataBySelectedFilters };
