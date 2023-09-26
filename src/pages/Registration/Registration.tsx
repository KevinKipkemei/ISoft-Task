import './Registration.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface patientData {
  First_Name: string;
  Last_Name: string;
  DOB: Date;
  Gender: string;
  Patient_ID: string;
}

interface RegistrationProps {
  patientID: string;
  setPatientID: React.Dispatch<React.SetStateAction<string>>;
}
const Registration = ({ patientID, setPatientID }: RegistrationProps) => {
  const navigate = useNavigate();

  //initial state with default values
  const [patientDetails, setPatientDetails] = useState<patientData>({
    First_Name: '',
    Last_Name: '',
    DOB: new Date(),
    Gender: 'male',
    Patient_ID: patientID,
  });

  //state updater function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Use the spread operator to copy the current state and update the specific field
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      Patient_ID: patientID,
    }));
  }, [patientID]);

  //state clearer function
  const handleClear = () => {
    setPatientDetails({
      First_Name: '',
      Last_Name: '',
      DOB: new Date(),
      Gender: '',
      Patient_ID: '',
    });
  };

  const generateRandomPatientID = () => {
    // Generate a random 6-character alphanumeric ID
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPatientID = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPatientID += characters.charAt(randomIndex);
    }

    return randomPatientID;
  };

  // Function to handle the "Save" button click
  const handleSave = () => {
    // Generate a random patient ID
    const randomID = generateRandomPatientID();

    // Call setPatientID with the generated ID
    setPatientID(randomID);

    navigate('/Visits', { state: { patientID: randomID } });
    alert('Saved')
  };

  // console.log(patientDetails);
  // console.log(patientID);

  return (
    <div className="registration-screen">
      <div className="form-header">
        <h2>Patient Registration</h2>
      </div>
      <div className="form-card">
        <label className="input-label">First Name</label>
        <input
          className="form-input"
          type="text"
          name="First_Name"
          value={patientDetails.First_Name}
          onChange={handleChange}
        />
        <label className="input-label">Last Name</label>
        <input
          className="form-input"
          type="text"
          name="Last_Name"
          value={patientDetails.Last_Name}
          onChange={handleChange}
        />
        <label className="input-label">DOB</label>
        <input
          className="form-input"
          type="date"
          name="DOB"
          value={patientDetails.DOB} // Format the date as a string
          onChange={handleChange}
        />
        <label className="input-label">Gender</label>
        <select
          className="select-dropdown"
          name="Gender"
          value={patientDetails.Gender}
          onChange={handleChange}
        >
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </select>
        <div className="form-action">
          <button className="action-btn" onClick={handleClear}>
            Clear
          </button>
          <button className="action-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
