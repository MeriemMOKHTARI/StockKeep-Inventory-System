import React from "react";
import PropTypes from "prop-types";

function InputTwo({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className="bg-[#2185D5] placeholder:text-white text-white text-center font-poppins text-[1.15rem] py-6 sm:min-w-[28rem] w-full px-6
       font-normal outline-none rounded-[8px]  mb-4"
      onClick={handleClick}
      type="button"
    >
      Change Password
    </button>
  );
}

InputTwo.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default InputTwo;
