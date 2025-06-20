import { useState } from "react";
import Logo from "../ui/Logo";
import Lien from "../admin/dashboard/Lien";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LowPriorityOutlinedIcon from "@mui/icons-material/LowPriorityOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
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
  const [hovered9, setHovered9] = useState(false);
  const [hovered10, setHovered10] = useState(false);

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
      className={`w-[18%] h-screen z-[2] bg-white bottom-0 pt-10 max-[770px]:absolute max-[770px]:w-[35%] ${
        !isOpen ? "hidden" : ""
      } md:block`}
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
        linkTo="/magasinier"
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
        linkTo="/ExternalOrders"
        onClick={() => handleLinkClick(1)}
        setHovered={setHovered2}
      >
        External orders
      </Lien>

      <Lien
        Icon={
          <FeedOutlinedIcon
            color={index === 2 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered3 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 2}
        linkTo="/Receipts"
        onClick={() => handleLinkClick(2)}
        setHovered={setHovered3}
      >
        Receipts
      </Lien>

      <Lien
        Icon={
          <LowPriorityOutlinedIcon
            color={index === 3 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered4 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 3}
        linkTo="/MovementSheet"
        onClick={() => handleLinkClick(3)}
        setHovered={setHovered4}
      >
        Movement sheets
      </Lien>

      <Lien
        Icon={
          <StoreMallDirectoryOutlinedIcon
            color={index === 4 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered5 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 4}
        linkTo="/Inventory"
        onClick={() => handleLinkClick(4)}
        setHovered={setHovered5}
      >
        Inventory
      </Lien>

      <Lien
        Icon={
          <LocalMallOutlinedIcon
            color={index === 5 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered6 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 5}
        linkTo="/InternalOrders"
        onClick={() => handleLinkClick(5)}
        setHovered={setHovered6}
      >
        Internal orders
      </Lien>

      <Lien
        Icon={
          <ExitToAppOutlinedIcon
            color={index === 6 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered7 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 6}
        linkTo="/ExitVouchers"
        onClick={() => handleLinkClick(6)}
        setHovered={setHovered7}
      >
        Exit vouchers
      </Lien>

      <Lien
        Icon={
          <TakeoutDiningOutlinedIcon
            color={index === 7 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered8 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 7}
        linkTo="/DischargeVouchers"
        onClick={() => handleLinkClick(7)}
        setHovered={setHovered8}
      >
        Discharge vouchers
      </Lien>

      <Lien
        Icon={
          <SettingsOutlinedIcon
            color={index === 8 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered9 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 8}
        linkTo="/Seeettings"
        onClick={() => handleLinkClick(8)}
        setHovered={setHovered9}
      >
        Settings
      </Lien>

      <LogOut open={open} handleClose={handleClose} setOpen={setOpen}>
        <button
          className={`flex items-center ${
            index === 9 ? "border-r-[#2185D5] border-r-4" : ""
          }  pl-[1.7rem] cursor-pointer absolute bottom-5 max-[800px]:pl-2`}
          onClick={handleClickOpen}
          onMouseEnter={() => setHovered10(true)}
          onMouseLeave={() => setHovered10(false)}
        >
          <ExitToAppOutlinedIcon
            color={index === 9 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered10 ? "scale-105" : ""}`}
          />
          <span
            className={`font-poppins text-[1.6rem] ${
              index === 9 ? "text-[#303841]" : "text-[#888]"
            } ml-3 ${index === 9 ? "font-bold" : "font-medium"}`}
          >
            Log out
          </span>
        </button>
      </LogOut>
    </aside>
  );
}

export default SideBar;
