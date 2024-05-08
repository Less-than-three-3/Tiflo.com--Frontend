import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/project/photo");
  }, [])

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
