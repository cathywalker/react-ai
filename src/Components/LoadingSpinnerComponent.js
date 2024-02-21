import { RingLoader } from 'react-spinners';

const LoadingSpinner = ({ color, size }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <RingLoader color={color} loading={true} size={size} />
    </div>
  );

  export default LoadingSpinner;