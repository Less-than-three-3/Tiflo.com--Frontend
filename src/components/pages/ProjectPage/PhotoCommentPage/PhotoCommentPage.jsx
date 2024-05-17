import {PhotoEditor} from "../../../sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {useProject} from "../../../../hooks/useProject.js";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";
import {useEffect, useState} from "react";
import {determineFileType} from "../../../../utils/format.js";
import {useProjectList} from "../../../../hooks/useProjectList.js";
import {PhotoOnboarding} from "../../../onboarding/PhotoOnboarding/PhotoOnboarding.jsx";
import {useUser} from "../../../../hooks/useUser.js";

export const PhotoCommentPage = () => {
  const {setProject} = useProject();
  const {projectList} = useProjectList();
  const params = useParams();
  const navigate = useNavigate();
  const {user} = useUser();

  console.log(user)
  useEffect(() => {
    (async () => {
      if (!params.projectId) {
        const photoProject = projectList.filter((project) => determineFileType(project.path) === "image")[0];
        navigate(`/project/photo/${photoProject.projectId}`);
      } else {
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

        {user.showOnboarding.photo &&
          <PhotoOnboarding/>
        }

      </div>
    </>
  );
}
