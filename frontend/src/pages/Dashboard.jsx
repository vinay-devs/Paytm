import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useAuth } from "../services/useAuth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("Unknown");
  const auth = useAuth();

  async function getBalance() {
    try {
      const res = await auth.axiosInstance.get("/account/balance");
      if (res.status == 200) {
        return res.data.balance;
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      return <Navigate to={"/signin"} />;
    }
  }
  async function getUserName() {
    try {
      const userData = await auth.axiosInstance.get("/user/user1");
      if (userData.status == 200) {
        return userData.data.firstName;
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      return <Navigate to={"/signin"} />;
    }
  }

  useEffect(() => {
    getBalance().then((data) => setBalance(data));
    getUserName().then((data) => setFirstName(data));
  });

  return (
    <div className="p-4">
      <Appbar firstName={firstName} />
      <Balance balance={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
