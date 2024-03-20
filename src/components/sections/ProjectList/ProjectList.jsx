import {useProject} from "../../../hooks/useProject.js";

export const ProjectList = () => {
  const {newProject} = useProject();

  return (
    <>
      <div className="section basis-1/5">
        <div className="grid grid-cols-2 font-bold">
          <div>Все проекты</div>
          {/*<div className="text-inactive mb-8">Недавние</div>*/}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="background-image w-full h-24"
               onClick={() => {
                 newProject();
               }}/>
        </div>
      </div>
    </>
  );
}
