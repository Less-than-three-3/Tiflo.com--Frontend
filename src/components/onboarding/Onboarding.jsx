import {Button} from "../UI/Button/Button.jsx";
import {onboarding} from "../../models/onboarding.js";
import {useEffect, useRef, useState} from "react";
import {Hint} from "./Hint.jsx";
import {useUser} from "../../hooks/useUser.js";
import {useLocation, useNavigate} from "react-router-dom";

export const Onboarding = () => {
  const {user, closePhotoOnboarding, closeVideoOnboarding} = useUser();

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [side, setSide] = useState("");
  const [position, setPosition] = useState({x: 0, y: 0});

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const item = useRef(null);
  useEffect(() => {
    if (item.current && item.current.component) {
      item.current.component.style.zIndex = "0";
      item.current.component.style.pointerEvents = "auto";
    }

    if (pathname.includes("/project/photo")) {
      item.current = onboarding.getPhoto(count);
    } else if (pathname.includes("/project/video")) {
      item.current = onboarding.getVideo(count);
    }

    if (item.current) {
      if (item.current.component) {
        item.current.component.style.zIndex = "1";
        item.current.component.style.pointerEvents = "none";
      }

      setText(item.current.data.text);
      setSide(item.current.data.side);

      console.log(item.current)
      switch (item.current.data.side) {
        case "left":
          setPosition({
            x: item.current.component.offsetLeft,
            y: item.current.component.offsetTop + item.current.component.offsetHeight / 2,
          });
          break;
        case "right":
          setPosition({
            x: item.current.component.offsetLeft + item.current.component.offsetWidth,
            y: item.current.component.offsetTop + item.current.component.offsetHeight / 2,
          });
          break;
        case "top":
          setPosition({
            x: item.current.component.offsetLeft + item.current.component.offsetWidth / 2,
            y: item.current.component.offsetTop,
          });
          break;
        case "bottom":
          setPosition({
            x: item.current.component.offsetLeft + item.current.component.offsetWidth / 2,
            y: item.current.component.offsetTop + item.current.component.offsetHeight,
          });
          break;
      }

    } else {
      if (pathname.includes("/project/photo")) {
        closePhotoOnboarding();
        if (user.showOnboarding.video) {
          navigate("/project/video");
        }
      } else if (pathname.includes("/project/video")) {
        closeVideoOnboarding();
        if (user.showOnboarding.photo) {
          navigate("/project/photo");
        }
      }
    }
  }, [count])

  return (
    <>
      <div className="h-full w-full bg-black opacity-50 absolute top-0 left-0"/>

      {text &&
        <Hint text={text} side={side} position={position}/>
      }

      <div className="absolute bottom-10 right-10 z-10">
        <Button
          value={count < (pathname.includes("/project/photo") ? (onboarding.photo.length - 1) : (onboarding.video.length - 1))
            ? "Далее" : "Понятно"}
          onClick={() => setCount((v) => v + 1)}
          mode="primary"/>
      </div>
    </>
  );
}
