const ConvertPermissionArr = (permissionsData) => {
  let tempName;
  let ansArray = [];
  let num = 0;
  const extraData = [
    { name: "checkout", permissionsArr: [{ type: "/checkout" }] },
    { name: "account", permissionsArr: [{ type: "Account" }] },
    { name: "dashboard", permissionsArr: [{ type: "Dashboard" }] },
    { name: "notifications", permissionsArr: [{ type: "Notificaitons" }] },
    { name: "payment_account", permissionsArr: [{ type: "Payment Account" }] },
    { name: "question_and_answer", permissionsArr: [{ type: "Q&A" }] }
  ]
  permissionsData?.map((data) => {
    if (tempName == data.name.split(".")[0]) {
      ansArray[num - 1].permissionsArr?.push({ id: data.id, type: data.name.split(".")[1] });
    } else {
      num++;
      tempName = data.name.split(".")[0];
      ansArray.push({ name: data.name.split(".")[0], permissionsArr: [{ id: data.id, type: data.name.split(".")[1] }] });
      if (tempName == "blog") {
        ansArray[num - 1].permissionsArr?.push({ type: "category" }, { type: "tag" });
      }
      if (tempName == "theme") {
        ansArray[num - 1].permissionsArr?.push({ type: "paris" }, { type: "tokyo" }, { type: "osaka" }, { type: "rome" }, { type: "madrid" }, { type: "berlin" }, { type: "prague" }, { type: "seoul" }, { type: "denver" });
      }
      if (tempName == "order") {
        ansArray[num - 1].permissionsArr?.push({ type: "details" });
      }
    }

  });
  ansArray = [...ansArray, ...extraData];
  return ansArray;
};

export default ConvertPermissionArr;
