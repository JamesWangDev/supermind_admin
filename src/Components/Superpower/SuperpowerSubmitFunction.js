const SuperpowerSubmitFunction = (mutate, value, updateId) => {
  let updatedData = {...value};
  updatedData['always_knowledges'] = updatedData['always_knowledges'].join();
  updatedData['library_knowledges'] = updatedData['library_knowledges'].join();
  mutate(updatedData);
};

export default SuperpowerSubmitFunction;
