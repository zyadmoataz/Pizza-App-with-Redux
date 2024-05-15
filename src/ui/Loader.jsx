function Loader() {
  return (
    //wrap it into a parent element to center it
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20  backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
