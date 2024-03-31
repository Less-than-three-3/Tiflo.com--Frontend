export const Input = ({value, handler, placeholder}) => {

  const onChange = (event) => {
    handler(event.target.value);
  }

  return (
    <>
      <input className="bg-seal w-full h-14 text-xl p-3 mb-8 rounded-md outline-none"
             type="text"
             placeholder={placeholder}
             value={value}
             onChange={onChange}/>
    </>
  );
}
