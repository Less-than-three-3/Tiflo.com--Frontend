export const Timestamp = ({time}) => {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="w-full h-0.5 bg-rat"/>
        <div className="m-2 text-xl">
          {time}
        </div>
        <div className="w-full h-0.5 bg-rat"/>
      </div>
    </>
  );
}
