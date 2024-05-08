import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useUser} from "../../../hooks/useUser.js";

export const HomePage = () => {
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {
    if (user.userId === "") {
      navigate("/auth/signIn");
    } else {
      navigate("/project/photo");
    }
  }, [])

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
