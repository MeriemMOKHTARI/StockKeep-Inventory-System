import { useState } from "react";
import Logo from "../ui/Logo";
import Lien from "../admin/dashboard/Lien";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogOut from "../ui/LogOut";

function SideBar({ isOpen, initialIndex }) {
  const [index, setIndex] = useState(initialIndex);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [hovered5, setHovered5] = useState(false);
  const [hovered6, setHovered6] = useState(false);
  const [hovered7, setHovered7] = useState(false);
  const [hovered8, setHovered8] = useState(false);
  const [hovered9, setHovered9] = useState(false);
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
        linkTo="/director"
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
            className={`${hovered6 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 1}
        onClick={() => handleLinkClick(1)}
        linkTo="/DInternalOrder"
        setHovered={setHovered6}
      >
        Internal Orders
      </Lien>
      <Lien
        Icon={
          <StorefrontIcon
            color={index === 2 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered7 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 2}
        onClick={() => handleLinkClick(2)}
        linkTo="/DInventory"
        setHovered={setHovered7}
      >
        Inventory
      </Lien>
      <Lien
        Icon={
          <SettingsOutlinedIcon
            color={index === 3 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered8 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 3}
        onClick={() => handleLinkClick(3)}
        linkTo="/Dsettings"
        setHovered={setHovered8}
      >
        Settings
      </Lien>

      <LogOut open={open} handleClose={handleClose} setOpen={setOpen}>
        <button
          className={`flex items-center ${
            Number(index) === 4 ? "border-r-[#2185D5] border-r-4" : ""
          }  pl-[1.7rem] cursor-pointer absolute bottom-5 max-[800px]:pl-2`}
          onMouseEnter={() => setHovered8(true)}
          onMouseLeave={() => setHovered8(false)}
          onClick={handleClickOpen}
        >
          <ExitToAppOutlinedIcon
            color={`${Number(index) === 4 ? "primary" : "disabled"}`}
            fontSize="large"
            className={`${hovered9 ? "scale-105" : ""}`}
          />
          <span
            className={`font-poppins text-[1.6rem] ${
              Number(index) === 4 ? "text-[#303841]" : "text-[#888]"
            } ml-3 ${Number(index) === 4 ? "font-bold" : "font-medium"} `}
          >
            Log out
          </span>
        </button>
      </LogOut>
    </aside>
  );
}

export default SideBar;
