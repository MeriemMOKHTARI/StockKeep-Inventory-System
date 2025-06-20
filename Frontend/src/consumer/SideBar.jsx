import { useState } from "react";
import Logo from "../ui/Logo";
import Lien from "../admin/dashboard/Lien";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogOut from "../ui/LogOut";

function SideBar({ isOpen, initialIndex }) {
  const [index, setIndex] = useState(initialIndex);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const handleLinkClick = (clickedIndex) => {
    setIndex(clickedIndex);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <aside
      className={`w-[18%] h-screen z-[2] bg-white bottom-0 pt-10  max-[770px]:absolute max-[770px]:w-[35%] 
     ${!isOpen ? "hidden" : ""} md:block`}
    >
      <Logo />
      <Lien
        Icon={
          <DashboardIcon
            color={index === 0 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered ? "scale-105" : ""}`}
          />
        }
        isActive={index === 0}
        linkTo="/consumer"
        onClick={() => handleLinkClick(0)}
        setHovered={setHovered}
      >
        Dashboard
      </Lien>

      <Lien
        Icon={
          <ShoppingBasketOutlinedIcon
            color={index === 1 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered2 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 1}
        onClick={() => handleLinkClick(1)}
        linkTo="/InternalOrder"
        setHovered={setHovered2}
      >
        Internal Orders
      </Lien>
      <Lien
        Icon={
          <SettingsOutlinedIcon
            color={index === 2 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered3 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 2}
        onClick={() => handleLinkClick(2)}
        linkTo="/settingsConsumer"
        setHovered={setHovered3}
      >
        Settings
      </Lien>

      <LogOut open={open} handleClose={handleClose} setOpen={setOpen}>
        <button
          className={`flex items-center  ${
            index === 7 ? "border-r-[#2185D5] border-r-4" : ""
          }  pl-[1.7rem] cursor-pointer absolute bottom-5 max-[800px]:pl-2`}
          onClick={handleClickOpen}
          onMouseEnter={() => setHovered4(true)}
          onMouseLeave={() => setHovered4(false)}
        >
          <ExitToAppOutlinedIcon
            color={index === 7 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered4 ? "scale-105" : ""}`}
          />
          <span
            className={`font-poppins text-[1.6rem] ${
              index === 7 ? "text-[#303841]" : "text-[#888]"
            } ml-3 ${index === 7 ? "font-bold" : "font-medium"}`}
          >
            Log out
          </span>
        </button>
      </LogOut>
    </aside>
  );
}

export default SideBar;
