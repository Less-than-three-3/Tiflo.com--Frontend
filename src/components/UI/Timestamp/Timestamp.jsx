import {useState} from "react";

export const Timestamp = ({time, isEditing = false}) => {
  const [value, setValue] = useState(time);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="w-full h-0.5 bg-rat"/>
        {/*{isEditing ?*/}
        {/*  <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>*/}
        {/*  :*/}
          <div className="m-2 text-xl">
            {time}
          </div>
        {/*}*/}
        <div className="w-full h-0.5 bg-rat"/>
      </div>
    </>
  );
}
