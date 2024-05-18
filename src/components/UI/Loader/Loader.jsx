import {Grid} from "react-loader-spinner";

export const Loader = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#7A79FF"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    </>
  )
}
