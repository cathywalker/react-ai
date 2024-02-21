const inputStyle = {
    borderRadius: '20px',
    border: '2px solid #FFD700', 
    padding: '10px',
    width: 'calc(100% - 24px)', /* Full width taking padding into account */
    marginBottom: '10px',
  };

const InputForm = ({ input, onInputChange, handleSubmit, displayWarning }) => (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          style={inputStyle} 
        />
        {displayWarning && <p style={{color: 'red'}}>Please enter a topic</p>}
        <button type='submit' style={{backgroundColor: "#0099ff", color: 'white'}}>
          Get me a joke in the style of my chosen Comedian
        </button>
      </form>
    </div>
  );

  export default InputForm;
  