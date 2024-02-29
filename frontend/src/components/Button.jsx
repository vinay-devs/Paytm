const Button = ({ label, type, onclick }) => {
  return (
    <div className="p-2">
      <button
        onClick={onclick}
        type={type ? type : "button"}
        className="text-white bg-black w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  "
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
