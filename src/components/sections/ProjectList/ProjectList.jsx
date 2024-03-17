export const ProjectList = ({project, setProject}) => {
  const openNewProject = () => {
    setProject({
      id: "",
      name: "New Project",
    });
  }

  // const openExistingProject = (event) => {
  //   const id = event.target.id;
  //   // console.log(id) // TODO Запрос на проект (фото + текст)
  // }

  return (
    <>
      <div className="section basis-1/5">
        <div className="grid grid-cols-2 font-bold">
          <div>Все проекты</div>
          {/*<div className="text-inactive mb-8">Недавние</div>*/}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div  style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
                className="background-image w-full h-24"
                onClick={openNewProject}/>

          {/*{projects.map((prj) => (*/}
          {/*    <div  key={prj.id}*/}
          {/*          id={prj.id}*/}
          {/*          style={{backgroundImage: `url(${prj.photo})`}}*/}
          {/*          className="background-image w-full h-24"*/}
          {/*          onClick={openExistingProject}/>*/}
          {/*))}*/}
        </div>
      </div>
    </>
  );
}
