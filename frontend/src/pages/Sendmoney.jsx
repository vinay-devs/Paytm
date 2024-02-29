import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { useState } from "react";
const Sendmoney = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, _] = useSearchParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const name = searchParams.get("name");
  const to = searchParams.get("to");
  async function sendMoney(to, amount) {
    await auth.axiosInstance.post("/account/transfer", {
      to: to,
      amount: amount,
    });
    navigate("/dashboard");
  }
  return (
    <div className="flex justify-center bg-gray-400 h-screen items-center">
      <div className="p-8 border bg-white rounded max-w-md">
        <h1 className="text-center p-5 font-bold text-2xl">Send Money</h1>
        <div className="flex gap-3 font-bold items-center">
          <div className="w-12 h-12 rounded-full bg-green-500 flex justify-center items-center">
            <h1 className="text-white font-semibold text-xl">
              {name[0].toUpperCase()}
            </h1>
          </div>
          <div>
            <h1>{name}</h1>
          </div>
        </div>
        <div>
          <h1 className="font-bold p-3">Amount (in Rs)</h1>
        </div>
        <div className="p-2">
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter Amount"
            className="border rounded p-1 w-full"
          />
        </div>
        <button
          onClick={() => sendMoney(to, amount)}
          className="border p-2 bg-green-500 rounded-lg text-white w-full"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default Sendmoney;
