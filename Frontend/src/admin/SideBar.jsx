import { useState } from "react";
import Logo from "../ui/Logo";
import Lien from "./dashboard/Lien";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
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
     ${!isOpen && "hidden"} md:block`}
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
        linkTo="/dashboard"
        onClick={() => handleLinkClick(0)}
        setHovered={setHovered}
      >
        Dashboard
      </Lien>

      <Lien
        Icon={
          <GroupIcon
            color={index === 1 ? "primary" : "disabled"}
            className={`${hovered2 ? "scale-105" : ""}`}
            fontSize="large"
          />
        }
        isActive={index === 1}
        linkTo="/users"
        onClick={() => handleLinkClick(1)}
        setHovered={setHovered2}
      >
        Users
      </Lien>

      <Lien
        Icon={
          <LocalGroceryStoreOutlinedIcon
            color={index === 2 ? "primary" : "disabled"}
            className={`${hovered3 ? "scale-105" : ""}`}
            fontSize="large"
          />
        }
        isActive={index === 2}
        linkTo="/consumers"
        onClick={() => handleLinkClick(2)}
        setHovered={setHovered3}
      >
        Consumers
      </Lien>

      <Lien
        Icon={
          <AccountTreeOutlinedIcon
            color={index === 3 ? "primary" : "disabled"}
            className={`${hovered4 ? "scale-105" : ""}`}
            fontSize="large"
          />
        }
        isActive={index === 3}
        linkTo="/structures"
        index={3}
        onClick={() => handleLinkClick(3)}
        setHovered={setHovered4}
      >
        Structures
      </Lien>

      <Lien
        Icon={
          <HubOutlinedIcon
            color={index === 4 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered5 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 4}
        linkTo="/roles"
        onClick={() => handleLinkClick(4)}
        setHovered={setHovered5}
      >
        Roles
      </Lien>

      <Lien
        Icon={
          <VerifiedOutlinedIcon
            color={index === 5 ? "primary" : "disabled"}
            fontSize="large"
            className={`${hovered6 ? "scale-105" : ""}`}
          />
        }
        isActive={index === 5}
        linkTo="/permissions"
        onClick={() => handleLinkClick(5)}
        setHovered={setHovered6}
      >
        Permissions
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
        linkTo="/settings"
        onClick={() => handleLinkClick(6)}
        setHovered={setHovered7}
      >
        Settings
      </Lien>

      <LogOut open={open} handleClose={handleClose} setOpen={setOpen}>
        <button
          className={`flex items-center ${
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
