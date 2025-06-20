import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyOrderQuery } from "../MagasinierSlice";
function SearchOrder() {
  const magasinier = useSelector((state) => state.magasinier);
  const orderQuery = magasinier.orderQuery;
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <SearchIcon
        color="disabled"
        fontSize="large"
        className="absolute left-4 top-3"
      />
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        className="bg-[#F7FAFC] rounded-[10px] py-4 px-20 border placeholder: font-poppins text-[12px]
         focus:outline-1 outline-offset-0 focus:outline-[#2185D5] max-[375px]:width-[80%]"
        value={orderQuery}
        onChange={(e) => {
          dispatch(modifyOrderQuery(e.target.value));
        }}
      />
    </div>
  );
}

export default SearchOrder;
