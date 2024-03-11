const SuperpowerSubmitFunction = (mutate, value, updateId) => {
  value['always_knowledges'] = value['always_knowledges'].toString();
  value['library_knowledges'] = value['library_knowledges'].toString();
  mutate(value);
};

export default SuperpowerSubmitFunction;
