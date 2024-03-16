import {useEffect, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import axios from "axios";

export const TextEditor = ({text, projectId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    setEditText(text)
  }, [text]);

  const toVoice = async () => {
    setTimeout(() => {
      axios({
        url: 'http://89.208.231.158:80/src/assets/cat.wav', //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'description.wav'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    }, 0)
  }

  return (
    <>
      <div className="section w-1/4">
        <div className="grid grid-cols-2 pb-6 w-9/12">
          <div className={`${!projectId ? "text-inactive" : isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(false)}>
            Текст
          </div>
          <div className={`${!projectId ? "text-inactive" : !isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(true)}>
            Редактирование
          </div>
        </div>
        <div className="overflow-scroll h-5/6 border-rat">
          {projectId &&
            <>
              {!isEditing ?
                <div>{editText}</div>
                :
                <textarea className="bg-inherit border-2 border-rat rounded-md p-2 outline-none h-5/6 w-full"
                          value={editText}
                          onChange={(event) => {
                            setEditText(event.target.value)
                          }}/>
              }

              {editText &&
                <div className="mt-4">
                  <Button value={"В голос"} onClick={toVoice}/>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
}
