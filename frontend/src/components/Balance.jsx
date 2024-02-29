const Balance = ({ balance }) => {
  return (
    <div className="flex pl-3 gap-3 font-semibold py-3">
      <h1>Your Balance</h1>
      <h1>Rs.{balance}</h1>
    </div>
  );
};

export default Balance;
