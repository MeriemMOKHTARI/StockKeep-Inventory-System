import logo from "../assets/logo.svg";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

const cookies = new Cookies();
function Logo() {
  const { companyImage } = useSelector((state) => state.company);
  const image = cookies.get("imageC");
  return <div className="flex justify-center items-center"> <img src={image} alt="ESI" className="mb-14 h-28 w-28" /> </div>;
}

export default Logo;
