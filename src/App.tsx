import './App.css';
import Registration from './pages/Registration/Registration';
import { useState } from 'react';

function App() {
  const [patientID, setPatientID] = useState<string>('');

  return (
    <>
      <Registration patientID={patientID} setPatientID={setPatientID} />
    </>
  );
}

export default App;
