import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const Spinner: React.FC<{ loading: boolean }> = ({ loading }) => (
  <PulseLoader color="#48bbff" loading={loading} size={15} />
);

export default Spinner;
