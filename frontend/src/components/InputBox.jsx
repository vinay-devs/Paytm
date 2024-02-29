import { useFormContext } from "react-hook-form";
const InputBox = ({ placeholder, label, type, name }) => {
  const { register } = useFormContext();

  return (
    <div className="p-2 flex justify-center ">
      <div className="w-full">
        <div className="p-1">
          <p className="font-semibold ">{label}</p>
        </div>
        <div>
          <input
            {...register(name, {
              required: { value: true, message: "It can't be empty" },
            })}
            className="border rounded p-1 w-full"
            type={type}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
