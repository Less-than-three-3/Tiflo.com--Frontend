import {PhotoEditor} from "../../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {useProject} from "../../../../hooks/useProject.js";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";
import {useEffect} from "react";
import {determineFileType} from "../../../../utils/format.js";
import {useProjectList} from "../../../../hooks/useProjectList.js";

export const PhotoCommentPage = () => {
  const {setProject} = useProject();
  const {projectList} = useProjectList();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.projectId) {
        console.log("no id")
        const photoProject = projectList.filter((project) => determineFileType(project.path) === "image")[0];
        navigate(`/project/photo/${photoProject.projectId}`);
      } else {
        console.log("id")
        const getProjectRes = await api.getProjectById(params.projectId);
        if (getProjectRes.status === 200) {
          setProject(getProjectRes.data);
        }
      }
    })()
  }, [params])

  return (
    <>
      <div className="flex gap-5 grow">
        <PhotoEditor/>
        <TextEditor/>
      </div>
    </>
  );
}
