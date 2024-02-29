import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useForm, FormProvider } from "react-hook-form";
import useFormSubmit from "../hooks/useFormSubmit";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit, response, login } = useFormSubmit(
    "http://localhost:3000/api/v1/user/signup"
  );

  const onHandleSubmit = async (data) => {
    handleSubmit(data);
  };

  useEffect(() => {
    if (login) {
      navigate("/dashboard");
    }
  }, [login, navigate]);

  return (
    <div className="flex justify-center h-screen items-center bg-gray-700">
      <div className="rounded border p-4 py-8 bg-white">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
            <Heading name={"Sign Up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              name="firstname"
              placeholder={"John"}
              label={"First Name"}
              type={"text"}
            />
            <InputBox
              name="lastname"
              placeholder={"Doe"}
              label={"Last Name"}
              type={"text"}
            />
            <InputBox
              name="username"
              placeholder={"vinay_dev_"}
              label={"UserName"}
              type={"text"}
            />
            <InputBox
              name="password"
              placeholder={"123456"}
              label={"Password"}
              type={"password"}
            />
            <Button label={"Sign Up"} type={"submit"} />
            <BottomWarning
              buttonText={"Sign In"}
              to={"/signin"}
              label={"Already Have Account ?"}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Signup;
