import { useState } from "react";
import Logo from "../ui/Logo";
import Lien from "../admin/dashboard/Lien";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
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
  const [hovered5, setHovered5] = useState(false);
  const [hovered6, setHovered6] = useState(false);
  const [hovered7, setHovered7] = useState(false);
  const [hovered8, setHovered8] = useState(false);
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
        linkTo="/achat"
        onClick={() => handleLinkClick(0)}
        setHovered={setHovered}
      >
        Dashboard
      </Lien>

      <Lien
        Icon={
          <FormatListBulletedIcon
            className={`${hovered2 ? "scale-105" : ""}`}
            color={index === 1 ? "primary" : "disabled"}
            fontSize="large"
          />
        }
        isActive={index === 1}
        linkTo="/Chapters"
        onClick={() => handleLinkClick(1)}
        setHovered={setHovered2}
      >
        Chapters
      </Lien>

      <Lien
        Icon={
          <FeedOutlinedIcon
            color={index === 2 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered3 ? "scale-105" : ""}`}
          />
        }
        linkTo="/Articles"
        isActive={index === 2}
        onClick={() => handleLinkClick(2)}
        setHovered={setHovered3}
      >
        Articles
      </Lien>

      <Lien
        Icon={
          <Inventory2OutlinedIcon
            color={index === 3 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered4 ? "scale-105" : ""}`}
          />
        }
        linkTo="/Products"
        isActive={index === 3}
        onClick={() => handleLinkClick(3)}
        setHovered={setHovered4}
      >
        Products
      </Lien>

      <Lien
        Icon={
          <LocalShippingOutlinedIcon
            color={index === 4 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered5 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 4}
        onClick={() => handleLinkClick(4)}
        linkTo="/Suppliers"
        setHovered={setHovered5}
      >
        Suppliers
      </Lien>

      <Lien
        Icon={
          <ShoppingBasketOutlinedIcon
            color={index === 5 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered6 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 5}
        onClick={() => handleLinkClick(5)}
        linkTo="/Orders"
        setHovered={setHovered6}
      >
        Orders
      </Lien>
      <Lien
        Icon={
          <SettingsOutlinedIcon
            color={index === 6 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered7 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 6}
        onClick={() => handleLinkClick(6)}
        linkTo="/seettings"
        setHovered={setHovered7}
      >
        Settings
      </Lien>

      <LogOut open={open} handleClose={handleClose} setOpen={setOpen}>
        <button
          className={`flex items-center  ${
            index === 7 ? "border-r-[#2185D5] border-r-4" : ""
          }  pl-[1.7rem] cursor-pointer absolute bottom-5 max-[800px]:pl-2`}
          onClick={handleClickOpen}
          onMouseEnter={() => setHovered8(true)}
          onMouseLeave={() => setHovered8(false)}
        >
          <ExitToAppOutlinedIcon
            color={index === 7 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered8 ? "scale-105" : ""}`}
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
