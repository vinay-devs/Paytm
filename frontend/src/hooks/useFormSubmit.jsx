import { useState } from "react";

import { useAuth } from "../services/useAuth";
const useFormSubmit = (url) => {
  const auth = useAuth();
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [urlValue, _] = useState(url);

  const handleSubmit = async (data) => {
    try {
      const res = await auth.axiosInstance.post(urlValue, data);
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setResponse({ status: res.status, data: res.data });
        setLogin(true);
      }
      setError(false);
    } catch (error) {
      setError(error);
    }
  };
  return { login, error, response, handleSubmit };
};

export default useFormSubmit;
