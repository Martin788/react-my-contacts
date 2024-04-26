const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h2 class="text-2xl text-red">I am sorry. Something went wrong:</h2>
      <h3 class="text-lg">{error.message}</h3>
    </div>
  );
};

export default ErrorFallback;