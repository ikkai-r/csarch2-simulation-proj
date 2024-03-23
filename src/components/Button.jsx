const Button = ({ icon, text, onClick, disabled }) => {
    return (
      <button 
        type="button" 
        onClick={onClick} 
        className={`md:float-right text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center flex  justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
        >
        {icon}
        <span>{text}</span> 
      </button>
    );
  };
  
  export default Button;
  