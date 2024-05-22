import {PhotoEditor} from "../../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {useProject} from "../../../../hooks/useProject.js";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";
import {useEffect, useState} from "react";
import {determineFileType} from "../../../../utils/format.js";
import {useProjectList} from "../../../../hooks/useProjectList.js";
import {Onboarding} from "../../../onboarding/Onboarding.jsx";
import {useUser} from "../../../../hooks/useUser.js";

export const PhotoCommentPage = () => {
  const {user} = useUser();
  const {setProject} = useProject();
  const {setProjectList} = useProjectList();

  const [loadingText, setLoadingText] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

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
          const photoProject = getProjectListRes.data.filter((project) => (determineFileType(project.path) === "image")
            || (determineFileType(project.path) === "none"))[0];
          navigate(`/project/photo/${photoProject.projectId}`);
        } else {
          const createProjectRes = await api.createProject();
          if (createProjectRes.status === 200) {
            navigate(`/project/photo/${createProjectRes.data.projectId}`);
          }
        }
      }
    })()
  }, [params])

  return (
    <>
      <div className="flex gap-5 grow">
        <PhotoEditor setLoadingText={setLoadingText} />
        <TextEditor loadingText={loadingText}/>

        {user.showOnboarding.photo &&
          <Onboarding/>
        }

      </div>
    </>
  );
}
