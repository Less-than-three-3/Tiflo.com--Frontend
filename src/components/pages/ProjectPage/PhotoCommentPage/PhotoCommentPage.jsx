import {PhotoEditor} from "../../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";

export const PhotoCommentPage = () => {
  return (
    <>
      <div className="flex gap-5 grow">
        <PhotoEditor/>
        <TextEditor/>
      </div>
    </>
  );
}
