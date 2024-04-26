const Scroll = ({ children }) => {
  return (
    <div class="h-75vh border-2 border-blue rounded-lg border-solid overflow-y-scroll">{children}</div>
  );
};

export default Scroll;