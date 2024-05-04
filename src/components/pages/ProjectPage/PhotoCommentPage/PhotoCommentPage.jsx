import {PhotoEditor} from "../../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {useProject} from "../../../../hooks/useProject.js";
import {useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";
import {useEffect} from "react";

export const PhotoCommentPage = () => {
  const {setProject} = useProject();

  const params = useParams();
  useEffect(() => {
    (async () => {
      const getProjectRes = await api.getProjectById(params.projectId);
      if (getProjectRes.status === 200) {
        setProject(getProjectRes.data);
      }
    })()
  })

  return (
    <>
      <div className="flex gap-5 grow">
        <PhotoEditor/>
        <TextEditor/>
      </div>
    </>
  );
}
