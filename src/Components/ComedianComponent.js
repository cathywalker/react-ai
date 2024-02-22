const buttonStyles = {
  selected: {
    backgroundColor: '#FF5733', 
  },
  unselected: {
    backgroundColor: '#00f2ffc0',
  }
};

const ComedianButton = ({ comedian, isSelected, onSelect }) => (
  <button onClick={() => onSelect(comedian)}
    style={isSelected ? buttonStyles.selected : buttonStyles.unselected}>
    {comedian}
  </button>
);

export default ComedianButton;