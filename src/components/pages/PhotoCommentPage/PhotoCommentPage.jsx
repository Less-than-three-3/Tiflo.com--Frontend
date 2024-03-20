import {PhotoEditor} from "../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../sections/TextEditor/TextEditor.jsx";

export const PhotoCommentPage = ({project, setProject}) => {
  return (
    <>
      <PhotoEditor project={project} setProject={setProject}/>
      <TextEditor project={project} setProject={setProject}/>
    </>
  );
}
