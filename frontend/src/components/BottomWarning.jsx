import { Link } from "react-router-dom";
const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="flex justify-center">
      <div className="flex">
        <h1 className=" text-center justify-center">{label}</h1>
        <Link to={to} className=" underline text-center ">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default BottomWarning;
