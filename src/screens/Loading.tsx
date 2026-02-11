const Loading = () => {
  return (
    <div className="w-100 vh-100">
      <div
        className="spinner-border text-primary-500 absolute top-50 start-50"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
