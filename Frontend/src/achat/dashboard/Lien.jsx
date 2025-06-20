import { Link } from "react-router-dom";

function Lien({ Icon, isActive, children, linkTo, index, setIndex }) {
  return (
    <Link to={linkTo}>
      <div
        className={`flex items-center ${
          isActive ? "border-r-[#2185D5] border-r-4" : ""
        }   pl-8 cursor-pointer py-2 mb-4 hover:bg-[#F4F7FE] delay-[10ms] justify-start flex-wrap max-[800px]:pl-2`}
        onClick={() => setIndex(index)}
      >
        {Icon}

        <span
          className={`font-poppins text-[1.6rem] ${
            !isActive ? "text-[#888]" : "text-[#303841]"
          } ml-3 ${!isActive ? "font-normal" : "font-bold"}`}
        >
          {children}
        </span>
      </div>
    </Link>
  );
}

export default Lien;
