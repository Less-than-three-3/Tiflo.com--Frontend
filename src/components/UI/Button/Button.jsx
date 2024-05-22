export const Button = ({value, onClick, mode}) => {
  const segments = value.split("|");

  return (
    <>
      <button className={(mode === "primary" ? "btn-blue" :
          (mode === "secondary" && "border-2 border-white"))
        + " btn h-10 w-full flex justify-center items-center"}
              onClick={onClick}
      >
        <div className="flex">
          {segments.map((segment, i) => (
            <div key={i} className="flex">
              <div>
                {segment}
              </div>
              {i !== segments.length - 1 &&
                <div className="mx-2">|</div>
              }
            </div>
          ))}
        </div>
      </button>
    </>
  );
}
