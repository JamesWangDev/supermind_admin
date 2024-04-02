const SuperpowerSubmitFunction = (mutate, value, updateId) => {
  let updatedData = {...value};
  updatedData['actions'] = updatedData['actions'].join();
  mutate(updatedData);
};

export default SuperpowerSubmitFunction;
