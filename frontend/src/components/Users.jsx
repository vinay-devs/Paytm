import { useEffect, useState } from "react";
import Button from "./Button";
import { useAuth } from "../services/useAuth";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const auth = useAuth();
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  async function getUsers(filter) {
    const res = await auth.axiosInstance.get(`/user/bulk?filter=${filter}`);
    if (res.status === 200) {
      setUsers(
        res.data.user
          .filter((user) => user._id != userId)
          .map((user) => {
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              id: user._id,
            };
          })
      );
    }
    return res;
  }
  useEffect(() => {
    getUsers(filter);
  }, [filter]);
  return (
    <div className="p-4">
      <h1 className=" font-bold pb-2">Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        className="border w-full p-1"
        onChange={(e) => setFilter(e.target.value)}
      />
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <h1 className=" font-semibold">{user.firstName}</h1>
      </div>
      <Button
        onclick={() => navigate(`/send?to=${user.id}&name=${user.firstName}`)}
        label={"Send Money"}
      />
    </div>
  );
};

export default Users;
