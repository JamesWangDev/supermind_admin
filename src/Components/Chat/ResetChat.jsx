export const ResetChat = ({ onReset }) => {

  const handleClickBtn = (e) => {
    e.preventDefault();
    onReset();
  }

  return (
    <div className="d-flex flex-row align-items-center">
      <button
        className="ms-2 btn btn-sm btn-sm-base btn-dark h-100 font-weight-bold rounded-lg bg-light hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-neutral-300"
        onClick={handleClickBtn}
      >
        Reset
      </button>
    </div>
  );
};