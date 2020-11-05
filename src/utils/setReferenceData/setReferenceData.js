export const setReferenceData = (data, reference, setDataFunction) => {
  reference.current = data;
  setDataFunction(data);
};
