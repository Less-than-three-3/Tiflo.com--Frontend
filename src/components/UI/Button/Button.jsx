export const Button = ({value, onClick}) => {
  return (
    <>
      <button className="btn btn-blue" onClick={onClick}>{value}</button>
    </>
  );
}
