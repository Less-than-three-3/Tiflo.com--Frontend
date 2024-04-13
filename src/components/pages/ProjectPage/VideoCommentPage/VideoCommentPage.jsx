import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {AudioEditor} from "../../../sections/AudioEditor/AudioEditor.jsx";
import {VideoEditor} from "../../../sections/VideoEditor/VideoEditor.jsx";

export const VideoCommentPage = ({setUpdateProject}) => {
  return (
    <>
      <div className="flex flex-col grow gap-5">
        <div className="flex grow gap-5">
          <VideoEditor setUpdateProject={setUpdateProject}/>
          <TextEditor/>
        </div>
        <AudioEditor updateProject={updateProject}/>
      </div>
    </>
  );
}
