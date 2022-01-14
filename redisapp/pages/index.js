export default function Home({cars}){

  const refreshCars = async () => {
    const res = await fetch('/api/search');
    const result = await res.json();
    cars = result['cars']; 
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      const form = new FormData(event.target);
      const formData = Object.fromEntries(form.entries());

      const res = await fetch('/api/cars', {
          body: JSON.stringify(formData),
          headers: {
              'Content-Type': 'application/json',
          },
          method: 'POST',
      });

      const result = await res.json();
      refreshCars();
      return result;
  }

  return (
      <div className="container">
        <h1>Create a Car</h1>
        <div className="row">
            <div className="col-3 col">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <input name="make" type="text" className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Model</label>
                        <input name="model" type="text" className="form-control"/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input name="image" type="text" className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" type="text" className="form-control"/>
                    </div>
                    
                    <div className="row">
                        <button type="submit" className="btn btn-primary col">Create Car</button>
                    </div>
                </form>
            </div>
            <div className="col-6 col">
                
                <table className="table .table-bordered">
                    <tbody>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
                    </tr>
                    {cars.map( (car) => (
                        <tr key={car.entityId}>
                            <td>{car.make}</td>
                            <td>{car.model}</td>
                            <td>{car.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
  );
}

import { searchCars } from "../lib/redis";
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await searchCars();
  const data = JSON.stringify(res);
  const ret = JSON.parse(data);
  // Pass data to the page via props
  return { 
      props: {
        cars: ret, 
      }, 
  }
}