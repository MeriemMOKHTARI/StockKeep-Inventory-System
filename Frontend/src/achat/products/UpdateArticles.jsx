import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { modifySelectedArticles } from "../AchatSlice";

function UpdateArticles({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedArticles } = useSelector((state) => state.achat);
  function handleClick(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }
  function handleCheck(article) {
    if (selectedArticles.includes(article))
      dispatch(
        modifySelectedArticles(selectedArticles.filter((a) => a !== article))
      );
    else dispatch(modifySelectedArticles([...selectedArticles, article]));
  }

  return (
    <>
      {/*console.log(selectedArticles)*/}
      <button
        className={`font-poppins outline-none px-6 py-6 rounded-[8px] w-full
        text-white text-[1.1rem] ${!isOpen ? "mb-4" : "mb-1"} bg-[#2185D5]`}
        type="button"
        onClick={(isOpen) => handleClick(isOpen)}
      >
        <div className="flex items-center justify-between">
          Articles
          <ExpandMoreIcon />
        </div>
      </button>
      {isOpen && (
        <div
          className="bg-[#2185D5] w-full font-poppins outline-none px-6 py-4 rounded-[8px]
        text-white text-[1.1rem]"
        >
          {items.map((item) => (
            <div
              className="flex items-center justify-start w-[80%]"
              key={item.id}
            >
              <input
                type="checkbox"
                id={item.id}
                defaultChecked={selectedArticles.includes(item.designation)}
                onChange={() => handleCheck(item.designation)}
              />
              <label htmlFor={item.id} className="ml-6">
                {item.designation}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default UpdateArticles;
