const styles = {
  inputStyle: {
    borderRadius: '20px',
    border: '2px solid #FFD700',
    padding: '10px',
    width: 'calc(100% - 24px)', // Full width taking padding into account
    marginBottom: '10px',
  },
  warningStyle: {
    color: 'red',
  },
  buttonStyle: {
    backgroundColor: "#0099ff",
    color: 'white',
  }
};

const InputForm = ({ input, onInputChange, handleSubmit, displayWarning }) => (
  <div className="input-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        style={styles.inputStyle}
        label="joke-input"
      />
      {displayWarning && <p aria-live style={styles.warningStyle}>Please enter a topic</p>}
      <button type='submit' style={styles.buttonStyle}>
        Get me a joke in the style of my chosen Comedian
      </button>
    </form>
  </div>
);

  export default InputForm;
  