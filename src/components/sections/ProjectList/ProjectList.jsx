import {useState} from "react";

export const ProjectList = () => {
  const [projects, SetProjects] = useState([
    {
      id: 1,
      name: "sheep",
      photo: "/src/assets/photo/sheep.png"
    },
    {
      id: 2,
      name: "bear",
      photo: "/src/assets/photo/bear.png"
    },
    {
      id: 3,
      name: "racoon",
      photo: "/src/assets/photo/racoon.png"
    },
    {
      id: 4,
      name: "winter man",
      photo: "/src/assets/photo/winter_man.png"
    },
    {
      id: 5,
      name: "squirrel",
      photo: "/src/assets/photo/squirrel.png"
    },
    {
      id: 6,
      name: "sheep",
      photo: "/src/assets/photo/sheep.png"
    },
    {
      id: 7,
      name: "bear",
      photo: "/src/assets/photo/bear.png"
    }
  ]);


  return (
    <>
      <div className="section basis-1/5">
        <div className="grid grid-cols-2 font-bold">
          <div>Все проекты</div>
          <div className="text-inactive mb-8">Недавние</div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="background-image w-full h-24"/>
          {projects.map((prj) => (
              <div key={prj.id}
                   style={{backgroundImage: `url(${prj.photo})`}}
                   className="background-image w-full h-24"/>
          ))}
        </div>
      </div>
    </>
  );
}
