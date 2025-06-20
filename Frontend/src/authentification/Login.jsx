import { useState } from "react";
import logo from "../assets/stockkeep.png";
import { Link } from "react-router-dom";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyEmail, modifyId, modifyRole } from "../admin/UserSlice";
import {
  modifyCompanyEmail,
  modifyCompanyImage,
  modifyCompanyTva,
  modifyName,
} from "../admin/CompanySlice";

const cookies = new Cookies();
function Login() {
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.admin);

  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { companyName } = useSelector((state) => state.company);

  const emailvalidation = (email) => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@esi-sba\.dz$/) && email !== "") {
      setMessage("Email not valid.");
    } else if (email === "") {
      setMessage("Email required.");
    } else {
      setMessage("");
    }
  };
  const Passwordvalidation = (password) => {
    if (password === "") {
      setMessage1("Password is required");
    } else {
      setMessage1("");
    }
  };

  async function handleLogin(event) {
    event.preventDefault();

    const response1 = await fetch("http://127.0.0.1:8000/user/entreprises/1/");
    const data1 = await response1.json();
    const imageC = data1.logo;
    cookies.set("imageC", imageC);
    cookies.set("companyEmail", data1.email);
    cookies.set("companyTva", data1.tva);
    cookies.set("name", data1.name);
    dispatch(modifyCompanyEmail(data1.email));
    dispatch(modifyCompanyTva(data1.tva));

    const response = await fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log(data);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("UserID", data.id);

      dispatch(modifyRole(data.role));
      cookies.set("accessToken", data.tokens.access);
      cookies.set("role", data.role);
      cookies.set("email", email);
      console.log(email);
      cookies.set("id", data.id);
      cookies.set("firstname", data.firstName);
      cookies.set("lastname", data.lastName);
      cookies.set("username", data.username);

      cookies.set("image", `http://127.0.0.1:8000/media/${data.image}`);
      dispatch(modifyCompanyImage(imageC));
      dispatch(modifyName(data1.name));
      cookies.set("refreshToken", data.tokens.refresh);
      switch (data.role) {
        case "admin":
          navigate("/dashboard", { replace: true });
          break;
        case "agent du service achat":
          navigate("/achat", { replace: true });
          break;
        case "magasinier":
          navigate("/magasinier", { replace: true });
          break;
        case "consommateur":
          navigate("/consumer", { replace: true });
          break;
        case "directeur":
          navigate("/director", { replace: true });
          break;
        case "responsable_structure":
          navigate("/responsable", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
      //dispatch(modifyEmail(email));
      dispatch(modifyId(users.filter((user) => user.email === email)[0].id));
    } else if (response.status === 401) {
      toast.error("Please check your username and password", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      return 0;
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center  bg-center h-screen w-screen bg-[url('./assets/background.png')] bg-cover bg-fixed">
        <div className="flex justify-center items-center h-screen w-full">
          <div className="bg-white p-8 rounded-[40px] shadow-lg w-[40rem]">
            <img src={logo} alt="Logo" className="mx-auto h-[50px] my-7" />
            <div className="my-9">
              <h2 className="text-2xl text-center font-bold font-poppins">
                Welcome back
              </h2>
              <p className="text-[#888888] text-center mb-6 font-poppins">
                Login to access your account
              </p>
            </div>
            <Input
              type="email"
              className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                dispatch(modifyEmail(e.target.value));
                emailvalidation(e.target.value);
              }}
            />
            <div className="flex justify-start mx-2">
              <p className="text-[11px] text-red-600 mb-4 font-poppins mt-[-3px]">
                {message}
              </p>
            </div>
            <Input
              type="password"
              className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px] "
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                Passwordvalidation(e.target.value);
              }}
            />
            <div className="flex justify-start mx-2">
              <p className="text-[11px] text-red-600 mb-4 font-poppins">
                {message1}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#2185D5] rounded-[8px] mr-2 poppins-regular"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="text-[#888888] text-[14px] poppins-regular">
                  Remember me
                </span>
              </label>
              <Link
                to="/ForgetPassword"
                className=" text-[#2185D5] hover:underline font-poppins text-[1.3rem]"
              >
                Forgot password ?
              </Link>
            </div>
            <button
              className="w-full h-[50px] bg-[#2185D5] text-white py-2 rounded-[8px] hover:bg-[#196aac] my-5 font-poppins text-[1.3rem]"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export { cookies };
export default Login;
