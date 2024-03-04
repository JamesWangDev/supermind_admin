import { BiDotsHorizontal } from "react-icons/bi";

export const ChatLoader = () => {
  return (
    <div className="d-flex flex-column align-items-start">
      <div
        className={`d-flex align-items-center bg-light px-4 py-2 rounded-2xl`}
        style={{ overflowWrap: "anywhere" }}
      >
        <BiDotsHorizontal />
      </div>
    </div>
  );
};