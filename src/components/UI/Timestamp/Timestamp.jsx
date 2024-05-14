import {useEffect, useState} from "react";
import {Divider} from "../Divider/Divider.jsx";

export const Timestamp = ({time, setTime, isEditing = false}) => {
  const [value, setValue] = useState(time);

  useEffect(() => {
    if (!isEditing) {
      setTime(value);
    }
  }, [isEditing]);

  const onChangeHandler = (event) => {
    const prevValue = value;
    const newValue = event.target.value;

    const arr1 = prevValue.split('');
    const arr2 = newValue.split('');
    const maxLength = Math.max(arr1.length, arr2.length);

    let difference = '';
    for (let i = 0; i < maxLength; i++) {
      if (arr1[i] !== arr2[i]) {
        difference = arr1.length > arr2.length ? arr1[i] : arr2[i];
        break;
      }
    }

    if (difference >= '0' && difference <= '9') {
      setValue(newValue);
    }
  }

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Divider/>
        {/*{isEditing ?*/}
        {/*  <input className="bg-inherit border-2 border-rat rounded-md p-1 outline-none m-2 w-full text-center text-xl"*/}
        {/*         type="text"*/}
        {/*         value={value}*/}
        {/*         onChange={onChangeHandler}/>*/}
        {/*  :*/}
        <div className="m-2">
          {value}
        </div>
        {/*}*/}
        <Divider/>
      </div>
    </>
  );
}
