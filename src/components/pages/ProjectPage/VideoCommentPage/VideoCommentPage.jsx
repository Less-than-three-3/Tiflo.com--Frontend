import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {AudioEditor} from "../../../sections/AudioEditor/AudioEditor.jsx";
import {VideoEditor} from "../../../sections/VideoEditor/VideoEditor.jsx";
import {useState} from "react";

export const VideoCommentPage = () => {
  const [updateProject, setUpdateProject] = useState(0);
  const [play, setPlay] = useState(false);
  return (
    <>
      <div className="flex flex-col grow gap-5">
        <div className="flex grow gap-5">
          <VideoEditor setUpdateProject={setUpdateProject} play={play}/>
          <TextEditor/>
        </div>
        <AudioEditor updateProject={updateProject} setPlay={setPlay}/>
      </div>
    </>
  );
}
