const SuperpowerSubmitFunction = (mutate, value, updateId) => {
  let updatedData = {...value};
  updatedData['uis'] = updatedData['uis'].join();
  mutate(updatedData);
};

export default SuperpowerSubmitFunction;
