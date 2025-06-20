import { useState } from "react";
import logo from "../assets/stockkeep.png";
import { Link, useParams } from "react-router-dom";

function ResetPassword() {
  const params = useParams();
  const uid = params.uid;
  const token = params.token;
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const Passwordvalidation = (password) => {
    if (password === "") {
      setMessage("Password is required");
    } else {
      setMessage("");
    }
  };
  const Passwordvalidation1 = (password) => {
    if (password === "") {
      setMessage1("Password is required");
    } else {
      setMessage1("");
    }
  };

  async function handleConfirm(event) {
    event.preventDefault();

    if (password != Confirmpassword) {
      setMessage2("Passwords are different");
    } else {
      setMessage2("");
    }

    const url = `http://127.0.0.1:8000/user/password-reset/${uid}/${token}/`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_password: password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.message === "Password reset success" && message2 === "") {
      alert("Password reset success");
      window.location.href = "/";
    } else {
      alert("Password reset Failed");
      return 0;
    }
  }

  return (
    <div className="flex justify-center items-center  bg-center h-screen w-screen bg-[url('./assets/background.png')] bg-cover bg-fixed">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-[40px] shadow-lg w-96">
          <img src={logo} alt="Logo" className="mx-auto h-[50px] my-7" />
          <div className="my-5">
            <h2 className="text-2xl text-center poppins-bold">
              Reset password
            </h2>
            <div className="h-2"></div>
            <p className="text-[#888888] text-center mb-6 poppins-regular">
              Please enter the new password
            </p>
          </div>
          <input
            type="password"
            className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px]  "
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              Passwordvalidation(e.target.value);
            }}
          />
          <div className="flex justify-start mx-2">
            <p className="text-[15px] text-red-600 mb-4 ">{message}</p>
          </div>
          <input
            type="password"
            className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px] "
            placeholder="Confirm new Password"
            value={Confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              Passwordvalidation1(e.target.value);
            }}
          />
          <div className="flex justify-start mb-4 mx-2">
            <p className="text-[15px] text-red-600  ">{message1}</p>
            <br />
            <p className="text-[15px] text-red-600 ">{message2}</p>
          </div>
          <Link to="/">
            <button
              className="w-full h-[50px] bg-[#2185D5] text-white rounded-[8px] hover:bg-[#196aac]  poppins-regular"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </Link>
          <div className="h-5"></div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
