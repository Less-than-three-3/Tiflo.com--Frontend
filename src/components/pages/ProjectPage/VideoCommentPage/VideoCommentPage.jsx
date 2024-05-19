import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {AudioEditor} from "../../../sections/AudioEditor/AudioEditor.jsx";
import {VideoEditor} from "../../../sections/VideoEditor/VideoEditor.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../../hooks/useProject.js";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";
import {useProjectList} from "../../../../hooks/useProjectList.js";
import {determineFileType} from "../../../../utils/format.js";

export const VideoCommentPage = () => {
  const {setProject} = useProject();
  const {setProjectList} = useProjectList()
  const params = useParams();
  const navigate = useNavigate();
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    (async () => {
      if (params.projectId) {
        const getProjectRes = await api.getProjectById(params.projectId);
        if (getProjectRes.status === 200) {
          setProject(getProjectRes.data);
        }
        return;
      }

      const getProjectListRes = await api.getProjectList();
      if (getProjectListRes.status === 200) {
        setProjectList(getProjectListRes.data);
        if (getProjectListRes.data && getProjectListRes.data.length !== 0) {
          const videoProject = getProjectListRes.data.filter((project) => determineFileType(project.path) === "video")[0];
          navigate(`/project/video/${videoProject.projectId}`);
        } else {
          const createProjectRes = await api.createProject();
          if (createProjectRes.status === 200) {
            navigate(`/project/video/${createProjectRes.data.projectId}`);
          }
        }
      }
    })()
  }, [params])

  return (
    <>
      <div className="flex flex-col grow gap-5">
        <div className="flex grow gap-5 h-3/6">
          <VideoEditor setLoadingComment={setLoadingComment}/>
          <TextEditor loadingtext={loadingComment}/>
        </div>
        <AudioEditor loadingComment={loadingComment}/>
      </div>
    </>
  );
}
