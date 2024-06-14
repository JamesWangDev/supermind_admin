const SuperpowerSubmitFunction = (mutate, value, updateId) => {
  let updatedData = {...value};
  updatedData["procedures"] = JSON.stringify(updatedData["procedures"])
  mutate(updatedData);
};

export default SuperpowerSubmitFunction;
