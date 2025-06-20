import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/AxiosInstance";

function RoleCombobox({ userId, currentRole, onRoleChange }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/role/listcreate/"
        );
        setRoles(response.data.filter((role) => role.name !== "admin"));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchRoles();
  }, []);

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
    onRoleChange(event.target.value);
  };

  return (
    <select
      value={selectedRole}
      onChange={handleChange}
      className="block w-30 p-[3px] outline-none bg-blue-500 border border-blue-500 rounded-[10px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
      style={{
        backgroundColor: "#2185D5",
        borderColor: "#2185D5",
        color: "white",
        fontFamily: "Poppins",
        fontWeight: "200",
        maxWidth: "120px",
      }}
    >
      {roles.map((role) => (
        <option
          key={role.id}
          value={role.name}
          selected={role.name === currentRole}
        >
          {role.name}
        </option>
      ))}
    </select>
  );
}

export default RoleCombobox;
