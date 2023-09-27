import './Listing.css';
import { useState } from 'react';

interface Person {
  name: string;
  age: number;
  BMI: number;
}

const Listing = () => {
  //initializing similar data like what we would get from our API
  const [people, setPeople] = useState<Person[]>([
    { name: 'Kevin Kipkemei', age: 30, BMI: 25 },
    { name: 'Alice Kamau', age: 20, BMI: 20 },
    { name: 'Bob Arum', age: 30, BMI: 18 },
  ]);

  //BMI status function
  const calculateBMIStatus = (BMI: number): string => {
    console.log(BMI);
    if (BMI < 18.5) {
      return 'Underweight';
    } else if (BMI >= 18.5 && BMI < 25) {
      return 'Normal';
    } else {
      return 'Overweight';
    }
  };

  const [filter, setFilter] = useState<string | null>(null);

  //settinf our filter choice
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredPeople = filter? (people.filter((person) => calculateBMIStatus(person.BMI) === filter))
    : (people);

  return (
    <div>
      <div className="listing-headings">
        <h3>Patient Report</h3>
        <p> Date: </p>
        <p>
        Experienced technical difficulties with Docker while trying to set up an
        instance.
      </p>
      </div>
      <div>
        <label>Filter by BMI Status: </label>
        <select onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Underweight">Underweight</option>
          <option value="Normal">Normal</option>
          <option value="Overweight">Overweight</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>BMI Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{calculateBMIStatus(person.BMI)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listing;
