import { useState } from "react";
import logo from "../assets/stockkeep.png";
import { Link } from "react-router-dom";
import Input from "../ui/Input";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailvalidation = (email) => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@esi-sba\.dz$/) && email !== "") {
      setMessage("Email is not valid");
    } else if (email === "") {
      setMessage("Email is required");
    } else {
      setMessage("");
    }
  };

  async function handleSend(event) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/user/password-reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.message === "check your email") {
      window.location.href = "/";
      const uid = data.encoded_pk;
      const token = data.token;
    } else {
      alert("Wrong email");
      return 0;
    }
  }

  return (
    <div className="flex justify-center items-center  bg-center h-screen w-screen bg-[url('./assets/background.png')] bg-cover bg-fixed">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="bg-white p-8 rounded-[40px] shadow-lg w-[35rem] max-w-[95%]">
          <img src={logo} alt="Logo" className="mx-auto h-[50px] my-7 mb-12" />
          <div>
            <h2 className="text-2xl text-center font-poppins font-bold">
              Forget password
            </h2>
            <div className="h-2"></div>
            <p className="text-[#888888] text-center mb-12 font-poppins px-4 ">
              Enter the email address associated with your account and we’ll
              send you a link to reset your password
            </p>
          </div>
          <Input
            type="email"
            className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              emailvalidation(e.target.value);
            }}
          />
          <div className="flex justify-start mx-2">
            <p className="text-[15px] text-red-600 mb-4 ">{message}</p>
          </div>
          <Link to="/ResetPassword">
            <button
              className="w-full h-[50px] text-[1.2rem] bg-[#2185D5] text-white rounded-[8px] hover:bg-[#196aac] m font-poppins font-normal "
              onClick={handleSend}
            >
              Send
            </button>
          </Link>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}
export default ForgetPassword;
