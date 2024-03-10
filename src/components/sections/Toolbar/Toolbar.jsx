export const Toolbar = () => {
  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        <img src="/src/assets/icons/home.svg" alt="home" className="toolbar-icon"/>
        <img src="/src/assets/icons/list.svg" alt="list" className="toolbar-icon"/>
        <img src="/src/assets/icons/image.svg" alt="image" className="toolbar-icon"/>
        <img src="/src/assets/icons/video.svg" alt="video" className="toolbar-icon"/>
        <img src="/src/assets/icons/plus.svg" alt="plus" className="toolbar-icon"/>
      </div>
    </>
  );
}
