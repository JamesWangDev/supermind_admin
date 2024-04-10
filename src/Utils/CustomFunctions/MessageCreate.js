import Capitalize from "./Capitalize";

const MessageCreate = (path) =>
  path
    .split("/")
    .slice(1)
    .map((word, i) => (i === 0 ? Capitalize(word) : i === 1 ? word : ""))
    .join(" ") + " successfully";

export default MessageCreate;
