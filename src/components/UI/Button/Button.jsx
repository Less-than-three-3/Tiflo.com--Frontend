export const Button = ({value, onClick, mode}) => {
  return (
    <>
      <button className={ (mode === "primary" ? "btn-blue" :
                          mode === "secondary" && "border-2 border-white")
                          + " btn h-10 w-full"} onClick={onClick}>{value}</button>
    </>
  );
}
