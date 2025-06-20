import { Card, Typography, Button } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import modifyIcon from "../../assets/Vector.png";
import islemImage from "../../assets/islem.png";
import EditProfile from "./EditProfile";
import EditCompany from "./EditCompany";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Type", "Picture", "Name", "Email", "TVA", "More"];

const cookies = new Cookies();

const TABLE_ROWS = [
  {
    Type: "Profile",
    Picture: islemImage,
    Name: "Ourred Islem CharefEddine",
    Email: "ic.ourred@esi-sba.dz",
    TVA: "-",
  },
  {
    Type: "Company",
    Picture: islemImage,
    Name: "ctest",
    Email: "contact@esi-sba.dz",
    TVA: "20%",
  },
];

function DataTable() {
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const fiirstName = cookies.get("firstname");
  const laastName = cookies.get("lastname");
  const email = cookies.get("email");
  const company = cookies.get("name");
  const image = cookies.get("image");
  const companyImage = cookies.get("imageC");
  const companyy = useSelector((state) => state.company);

  const companyEmail = cookies.get("companyEmail");
  const companyTva = cookies.get("companyTva");

  TABLE_ROWS[0].Name = fiirstName + " " + laastName;
  TABLE_ROWS[0].Email = email;
  TABLE_ROWS[0].Picture = image;
  TABLE_ROWS[1].Name = company;
  TABLE_ROWS[1].Picture = companyImage;
  TABLE_ROWS[1].Name = company;
  TABLE_ROWS[1].Email = companyEmail;
  TABLE_ROWS[1].TVA = companyTva;
  const handleClickOpen = (index) => {
    setOpen(true);
    if (TABLE_ROWS[index].Type === "Profile") {
      setEditType("profile");
    } else if (TABLE_ROWS[index].Type === "Company") {
      setEditType("company");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className="table-container m-4 h-full rounded-[11px]"
      style={{ borderRadius: "20px !important", backgroundColor: "#ffffff" }}
    >
      <Card
        className="h-full w-full overflow-scroll rounded-[11px]"
        style={{ borderRadius: "20px !important" }}
      >
        <div className="ml-8 mr-12  mb-[3.5rem] mt-12 flex items-center justify-between gap-8">
          <Typography
            color="blue-gray"
            style={{
              fontSize: "24px",
              color: "#444444",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Settings
          </Typography>
        </div>
        <table
          className="w-full ml-6 min-w-max table-auto text-left"
          style={{ fontSize: "14px", fontFamily: "Poppins", fontWeight: 100 }}
        >
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium leading-none opacity-70"
                    style={{ fontFamily: "Poppins", fontWeight: 600 }}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ Type, Picture, Name, Email, TVA, More }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={Type}>
                    <td className={`${classes} w-[160px]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 100,
                          color: "#48505E",
                        }}
                      >
                        {Type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Avatar
                        src={Picture}
                        alt={Name}
                        size="md"
                        className="rounded-full h-[6rem] w-[6rem]"
                      />
                    </td>
                    <td className={`${classes} w-[200px],mr-2`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        style={{ fontFamily: "Poppins", color: "#48505E" }}
                      >
                        {Name}
                      </Typography>
                    </td>
                    <td className={`${classes} w-[200px],mr-2`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        style={{ fontFamily: "Poppins", color: "#48505E" }}
                      >
                        {Email}
                      </Typography>
                    </td>
                    <td className={`${classes} w-[200px],mr-2`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        style={{ fontFamily: "Poppins", color: "#48505E" }}
                      >
                        {TVA}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div
                        className="bg-white border border-blue-500 rounded-[10px] w-[70px] h-[37px] flex items-center justify-center mr-[1px]"
                        style={{ borderColor: "#D0D3D9" }}
                      >
                        {editType === "profile" && (
                          <EditProfile
                            open={open}
                            handleClose={handleClose}
                            setOpen={setOpen}
                          >
                            <Button
                              className="flex items-center gap-3 p-[8px]"
                              onClick={() => handleClickOpen(index)}
                            >
                              <div className="flex flex-row justify-center items-center">
                                <img
                                  src={modifyIcon}
                                  alt="Modify"
                                  className="h-5 w-5 mr-1.5"
                                />
                                <span className="text-[#48505E]">Edit</span>
                              </div>
                            </Button>
                          </EditProfile>
                        )}
                        {editType === "company" && (
                          <EditCompany
                            open={open}
                            handleClose={handleClose}
                            setOpen={setOpen}
                          >
                            <Button
                              className="flex items-center gap-3 p-[8px]"
                              onClick={() => handleClickOpen(index)}
                            >
                              <div className="flex flex-row justify-center items-center">
                                <img
                                  src={modifyIcon}
                                  alt="Modify"
                                  className="h-5 w-5 mr-1.5"
                                />
                                <span className="text-[#48505E]">Edit</span>
                              </div>
                            </Button>
                          </EditCompany>
                        )}
                        {editType !== "profile" && editType !== "company" && (
                          <Button
                            className="flex items-center gap-3 p-[8px]"
                            onClick={() => handleClickOpen(index)}
                          >
                            <div className="flex flex-row justify-center items-center">
                              <img
                                src={modifyIcon}
                                alt="Modify"
                                className="h-5 w-5 mr-1.5"
                              />
                              <span className="text-[#48505E]">Edit</span>
                            </div>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default DataTable;
