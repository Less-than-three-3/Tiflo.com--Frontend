import {useEffect, useRef, useState} from "react";

export const Hint = ({text, side, position}) => {
  const [hintPosition, setHintPosition] = useState({x: 0, y: 0});
  const hintRef = useRef(null);

  useEffect(() => {
    if (position.x !== 0 && position.y !== 0) {
      switch (side) {
        case "left":
          setHintPosition({
            x: position.x - hintRef.current.offsetWidth,
            y: position.y - hintRef.current.offsetHeight / 2,
          })
          console.log(position.x - hintRef.current.offsetHeight)
          console.log(position.y - hintRef.current.offsetHeight / 2)
          break;
        case "right":
          setHintPosition({
            x: position.x,
            y: position.y - hintRef.current.offsetHeight / 2,
          })
          break;
        case "top":
          setHintPosition({
            x: position.x - hintRef.current.offsetWidth / 2,
            y: position.y - hintRef.current.offsetHeight,
          })
          break;
        case "bottom":
          setHintPosition({
            x: position.x - hintRef.current.offsetWidth / 2,
            y: position.y,
          })
          break;
      }
    }
  }, [position])

  const setFlexDirection = () => {
    switch (side) {
      case "left":
        return "flex-row";
      case "right":
        return "flex-row-reverse";
      case "top":
        return "flex-col";
      case "bottom":
        return "flex-col-reverse";
    }
  }

  const setOffset = () => {
    switch (side) {
      case "left":
        return "-left-2";
      case "right":
        return "-right-2";
      case "top":
        return "-top-2";
      case "bottom":
        return "-bottom-2";
    }
  }

  return (
    <>
      <div className={`absolute flex items-center ${setFlexDirection()}`}
           style={{left: `${hintPosition.x}px`, top: `${hintPosition.y}px`}}
           ref={hintRef}
      >

        <div className="bg-koala p-4 rounded-xl max-w-64 text-pretty">
          {text}
        </div>

        <div className={`bg-koala w-4 h-4 rotate-45 relative ${setOffset()}`}/>
      </div>
    </>
  );
}
