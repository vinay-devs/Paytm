import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appbar = ({ firstName }) => {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);
  return (
    <div className="shadow h-14 flex justify-between relative">
      <div className="flex flex-col justify-center h-full ml-4 ">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {firstName}
        </div>
        <div>
          <div
            onClick={() => setDropDown((prev) => !prev)}
            className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2"
          >
            <div className="flex flex-col justify-center h-full text-xl">
              {firstName[0].toUpperCase()}
            </div>
          </div>
          <div
            id="dropdown"
            onClick={() => setDropDown((prev) => !prev)}
            className={`z-10 absolute ${
              !dropDown ? "hidden" : null
            }  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700`}
          >
            <ul
              ref={ref}
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
            >
              <li>
                <a
                  onClick={() => {
                    localStorage.clear();
                    navigate("/signin");
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
