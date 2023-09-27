import './Visits.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface vitalsData {
  Height: number;
  Weight: number;
  Date: Date;
  BMI: number;
  Patient_ID: string;
  Good_Health: string;
  Diet: string;
  Drugs: string;
  Comments: string;
}

const Visits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientID } = location.state;

  //initial state with default values
  const [vitalsData, setvitalsData] = useState<vitalsData>({
    Height: 0,
    Weight: 0,
    Date: new Date(),
    BMI: 0,
    Patient_ID: patientID,
    Good_Health: '',
    Diet: '',
    Drugs: '',
    Comments: '',
  });

  //state updater function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Check if the input's name corresponds to a numeric field (Height, Weight, BMI)
    const isNumericField = ['Height', 'Weight', 'BMI'].includes(name);

    const updatedValue = isNumericField ? parseFloat(value) : value;

    // Update vitalsData
    setvitalsData((prevVitalsDetails) => ({
      ...prevVitalsDetails,
      [name]: updatedValue,
    }));
  };

  useEffect(() => {
    // Calculate BMI whenever Height or Weight changes, rounded the BMI value to three decimal places.
    const { Height, Weight } = vitalsData;
    if (Height > 0 && Weight > 0) {
      const heightInMeters = Height / 100;
      const bmi = (Weight / (heightInMeters * heightInMeters)).toFixed(3);
      setvitalsData((prevVitalsData) => ({
        ...prevVitalsData,
        BMI: parseFloat(bmi),
      }));
    }
  }, [vitalsData.Height, vitalsData.Weight]);

  useEffect(() => {
    setvitalsData((prevVitalsData) => ({
      ...prevVitalsData,
      Patient_ID: patientID,
    }));
  }, [patientID]);

  const handleSave = () => {
    navigate('/Listing');
    alert('Saved');
  };

  // console.log(vitalsData);

  return (
    <div className="visits-screen">
      <div className="form-header">
        <h3>Vitals</h3>
      </div>
      <div className="form-card">
        <label className="input-label">Date</label>
        <input
          className="form-input"
          type="date"
          name="Date"
          value={vitalsData.Date}
          onChange={handleChange}
        />
        <label className="input-label">Height (cm)</label>
        <input
          className="form-input"
          type="number"
          name="Height"
          value={isNaN(vitalsData.Height) ? '' : vitalsData.Height} // Check for NaN and provide an empty string as the value in that case
          onChange={handleChange}
        />
        <label className="input-label">Weight (kg)</label>
        <input
          className="form-input"
          type="number"
          name="Weight"
          value={isNaN(vitalsData.Weight) ? '' : vitalsData.Weight}
          onChange={handleChange}
        />
        <label className="input-label"> BMI</label>
        <input
          className="form-input"
          type="number"
          name="BMI"
          value={vitalsData.BMI}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="section-card">
        <h3>Additional Section</h3>
        {vitalsData.BMI > 0 && // Check if BMI is greater than 0 before rendering
          (vitalsData.BMI < 25 ? (
            <div className="bmi-div">
              <h3>Section A</h3>
              <label className="input-label"> Good Health?</label>
              <div>
                <input
                  id="yes "
                  type="radio"
                  name="Good_Health"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  id="no"
                  type="radio"
                  name="Good_Health"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="no">No</label>
              </div>
              <label className="input-label">
                {' '}
                Have you ever been on diet to loose weight?
              </label>
              <div>
                <input
                  id="yes "
                  type="radio"
                  name="Diet"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  id="no"
                  type="radio"
                  name="Diet"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="no">No</label>
              </div>
              <label>Comments</label>
              <textarea
                name="Comments"
                value={vitalsData.Comments}
                onChange={handleChange}
                rows={4}
              />
            </div>
          ) : (
            <div className="bmi-div">
              <h3>Section B</h3>
              <label className="input-label"> Good Health?</label>
              <div>
                <input
                  id="yes "
                  type="radio"
                  name="Good_Health"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  id="no"
                  type="radio"
                  name="Good_Health"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="no">No</label>
              </div>
              <label className="input-label">
                Are you currently taking any drugs?
              </label>
              <div>
                <input
                  id="yes "
                  type="radio"
                  name="Drugs"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  id="no"
                  type="radio"
                  name="Drugs"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="no">No</label>
              </div>
              <label>Comments</label>
              <textarea
                name="Comments"
                value={vitalsData.Comments}
                onChange={handleChange}
                rows={4}
              />
            </div>
          ))}
      </div>
      <div className="form-action">
        <button className="action-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Visits;
