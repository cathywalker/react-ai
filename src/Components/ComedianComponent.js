const ComedianButton = ({ comedian, isSelected, onSelect }) => (
    <button onClick={() => onSelect(comedian)}
      style={{ backgroundColor: isSelected ? '#FF5733' : '#00f2ffc0' }}>
      {comedian}
    </button>
  );

  export default ComedianButton;