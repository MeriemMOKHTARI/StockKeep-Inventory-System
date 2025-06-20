import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import MyToggle from "../../ui/MyToggle";
import { modifyUsers } from "../AdminSlice";
import Filters from "../../assets/Filters.png";
import RoleCombobox from "../../ui/RoleCombobox";
import ConfirmDelete from "../../ui/ConfirmDelete";
import React, { useState, useEffect } from "react";
import modifyIcon from "../../assets/modifyIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../Services/AxiosInstance";
import { Card, Typography, Button } from "@material-tailwind/react";

const TABLE_HEAD = [
  { name: "Username" },
  { name: "First Name" },
  { name: "Last Name" },
  { name: "Email" },
  { name: "Role" },
  { name: "Activity" },
  { name: "More" },
];

function Users() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [roles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(0);
  const { searchQuery, users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [updatedUsers, setUpdatedUsers] = useState(users);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosInstance.get("/user/listcreate/");
        setUpdatedUsers(response.data.filter((user) => user.role !== "admin"));
      } catch (error) {
        setError("An error occurred while fetching user data.");
        console.error("Error fetching user data:", error);
      }
    }
    fetchUsers();
  }, [dispatch, users]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleRoleChange = (userId, newRole) => {
    axiosInstance
      .patch(`http://127.0.0.1:8000/user/rud/${userId}/`, { role: newRole })
      .then((response) => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, roe: newRole };
          } else return user;
        });
        dispatch(modifyUsers(updatedUsers));
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const handleToggle = (userId, newStatus) => {
    axiosInstance
      .patch(`http://127.0.0.1:8000/user/rud/${userId}/`, {
        is_active: newStatus,
      })
      .then((response) => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, is_active: newStatus };
          } else return user;
        });

        dispatch(modifyUsers(updatedUsers));
      })
      .catch((error) => {
        console.error("Error updating user activity status:", error);
      });
  };

  /*isLoading ? (
    <div className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-w-[-50%]">
      <LineWave
        visible={true}
        height="200"
        width="200"
        color="#2185D5"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  ) : (*/
  return (
    <main
      className="table-container m-4 h-full rounded-[11px]"
      style={{ borderRadius: "20px !important", backgroundColor: "#ffffff" }}
    >
      <Card
        className="h-full w-full overflow-auto rounded-[11px]"
        style={{ borderRadius: "20px !important" }}
      >
        <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8">
          <Typography
            color="blue-gray"
            style={{
              fontSize: "24px",
              color: "#444",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Users
          </Typography>
          <div className="flex items-center">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                padding: "8px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{ borderRadius: "10px", border: "1px solid #D0D3D9" }}
              >
                <Button
                  className="flex items-center gap-3 p-[8px]"
                  style={{
                    color: "#5D6679",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  <img src={Filters} alt="FilterIcon" className="h-6 w-6" />
                  Filters
                </Button>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#2185D5",
                borderRadius: "10px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CreateUser
                open={open}
                handleClose={handleClose}
                setOpen={setOpen}
              >
                <Button
                  className="flex items-center gap-3 p-[8px]"
                  onClick={handleClickOpen}
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                  Add user
                </Button>
              </CreateUser>
            </div>
          </div>
        </div>
        {/* Error handling */}
        {error && (
          <div className="text-red-600 bg-red-200 p-4 mb-4 rounded-md">
            Error: {error}
          </div>
        )}

        {/* Table Content */}
        <table
          className="w-full min-w-max table-auto text-left  overflow-auto 
          max-h-[59vh]"
          style={{ fontSize: "14px", fontFamily: "Poppins", fontWeight: 100 }}
        >
          <thead className="relative z-[2] w-full bg-blue-gray-50">
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 sticky top-0  
                  bg-slate-100 ${index === 0 ? "pl-6" : ""}`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="leading-none"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      color: "#48505E",
                    }}
                  >
                    {head.name}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {updatedUsers
              .filter(
                (user) =>
                  user.username
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase()) ||
                  user.first_name
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase()) ||
                  user.last_name
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().startsWith(searchQuery.toLowerCase())
              )
              .map(
                (user) =>
                  user.role !== "consumer" && ( // Filtrer les utilisateurs ayant le rôle "consumer"
                    <tr key={user.id}>
                      <td className="p-4 pl-6 w-[160px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {user.username}
                        </Typography>
                      </td>
                      <td className="p-4 w-[160px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {user.first_name}
                        </Typography>
                      </td>
                      <td className="p-4 w-[160px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {user.last_name}
                        </Typography>
                      </td>
                      <td className="p-4 w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className="p-4 w-[170px]">
                        <RoleCombobox
                          userId={user.id}
                          currentRole={user.role}
                          roles={roles.filter((role) => role !== "consumer")} // Filtrer le rôle "consumer"
                          onRoleChange={(newRole) =>
                            handleRoleChange(user.id, newRole)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <MyToggle
                          enabled={user.is_active}
                          onToggle={(newStatus) =>
                            handleToggle(user.id, newStatus)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex justify-start">
                          <UpdateUser
                            open={openUpdate}
                            handleClose={handleCloseUpdate}
                            setOpen={setOpenUpdate}
                            id={selectedUser}
                          >
                            <button
                              className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                              style={{ borderColor: "#D0D3D9" }}
                              onClick={() => {
                                handleClickOpenUpdate();
                                setSelectedUser(user.id);
                              }}
                            >
                              <img
                                src={modifyIcon}
                                alt="Modify"
                                className="h-5 w-5"
                              />
                            </button>
                          </UpdateUser>
                          <ConfirmDelete
                            open={openD}
                            handleClose={handleCloseD}
                            setOpen={setOpenD}
                            id={selectedUser}
                            concern="user"
                          >
                            <button
                              className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center"
                              style={{
                                borderColor: "#D0D3D9",
                                marginLeft: "3px",
                              }}
                              onClick={() => {
                                handleClickOpenD();
                                setSelectedUser(user.id);
                              }}
                            >
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                className="h-5 w-5"
                              />
                            </button>
                          </ConfirmDelete>
                        </div>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </Card>
    </main>
  );
}

export default Users;
