import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFormSubmit from "../hooks/useFormSubmit";
import { useEffect } from "react";

const Signin = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const { handleSubmit, response, login } = useFormSubmit(
    "http://localhost:3000/api/v1/user/signin"
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
            <Heading name={"Sign In"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />

            <InputBox
              placeholder={"vinay_dev_s"}
              label={"username"}
              type={"text"}
              name={"username"}
            />
            <InputBox
              name={"password"}
              placeholder={"123456"}
              label={"Password"}
              type={"password"}
            />
            <Button label={"Sign In"} type={"submit"} />
            <BottomWarning
              buttonText={"Sign Up"}
              to={"/signup"}
              label={"Don't have an Account?"}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Signin;
