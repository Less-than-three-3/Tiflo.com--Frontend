import {TextEditor} from "../../../sections/TextEditor/TextEditor.jsx";
import {AudioEditor} from "../../../sections/AudioEditor/AudioEditor.jsx";
import {VideoEditor} from "../../../sections/VideoEditor/VideoEditor.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../../hooks/useProject.js";
import {useParams} from "react-router-dom";
import {api} from "../../../../api/api.js";

export const VideoCommentPage = () => {
  const {setProject} = useProject();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const getProjectRes = await api.getProjectById(params.projectId);
      if (getProjectRes.status === 200) {
        setProject(getProjectRes.data);
      }
    })()
  }, [params])

  return (
    <>
      <div className="flex flex-col grow gap-5">
        <div className="flex grow gap-5">
          <VideoEditor/>
          <TextEditor/>
        </div>
        <AudioEditor/>
      </div>
    </>
  );
}
