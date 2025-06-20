function SubmitButton({ children }) {
    return (
      <button
        className={`text-white bg-[#6ED120] rounded-[10px]  font-poppins py-4 w-[9rem] text-center ml-4
       `}
        type="submit"
      >
        {children}
      </button>
    );
  }
  
  export default SubmitButton;
  