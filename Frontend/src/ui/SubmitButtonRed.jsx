function SubmitButtonRed({ onClick, children }) {
  return (
    <button
      className={`text-white bg-[#FF4747] rounded-[10px] font-poppins py-4 w-[9rem] text-center ml-4
       `}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButtonRed;
