import './Listing.css';
import { useState } from 'react';
import axios from 'axios';

interface Person {
  name: string;
  age: number;
  BMI: number;
}

const Listing = () => {
  const [filter, setFilter] = useState<string | null>(null);
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

  //setting our filter choice
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredPeople = filter
    ? people.filter((person) => calculateBMIStatus(person.BMI) === filter)
    : people;

  const getListings = () => {
    const apiUrl =
      'https://play.dhis2.org/2.38.4.3/api/29/trackedEntityInstances.json?program=fDd25txQckK&ou=gI9YOMHC4xx';

    const username = 'admin';
    const password = 'district';

    const basicAuthToken = btoa(`${username}:${password}`);

    const headers = {
      Authorization: `Basic ${basicAuthToken}`,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="listing-headings">
        <h3>Patient Report</h3>
        <p> Date: </p>
        <p>
          Experienced technical difficulties with Docker while trying to set up
          an instance.
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
