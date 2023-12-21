const LoadingSpinner = () => {
  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    borderTop: '4px solid #000',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
