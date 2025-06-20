//import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Profile() {
  const firstName = cookies.get("firstname");
  const lastName = cookies.get("lastname");
  const image = cookies.get("image");

  //const { firstName, lastName } = useSelector((state) => state.user);
  return (
    <div className="bg-white py-10 px-32 rounded-3xl flex flex-col items-center gap-3">
      <img
        src={image}
        alt=""
        className="rounded-[50%] max-h-[12rem] max-w-[12rem]"
      />

      <h2 className="text-[#303841] font-semibold text-[1.6rem] text-center">
        {`${firstName} ${lastName}`}
      </h2>
      <span className="font-poppins text-[#2185D5] text-[1.4rem] font-bold">
        Purchasing department agent
      </span>
    </div>
  );
}

export default Profile;
