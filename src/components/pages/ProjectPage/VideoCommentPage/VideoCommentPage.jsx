import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {AudioEditor} from "../../../sections/AudioEditor/AudioEditor.jsx";
import {VideoEditor} from "../../../sections/VideoEditor/VideoEditor.jsx";
import {useRef, useState} from "react";

export const VideoCommentPage = () => {
  const [updateProject, setUpdateProject] = useState(0);
  const [play, setPlay] = useState(false);
  const multitrackRef = useRef(null);

  return (
    <>
      <div className="flex flex-col grow gap-5">
        <div className="flex grow gap-5">
          <VideoEditor multitrackRef={multitrackRef} setUpdateProject={setUpdateProject} play={play} setPlay={setPlay} />
          <TextEditor multitrackRef={multitrackRef}/>
        </div>
        <AudioEditor multitrackRef={multitrackRef} updateProject={updateProject} play={play} setPlay={setPlay}/>
      </div>
    </>
  );
}
