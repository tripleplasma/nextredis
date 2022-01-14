import {useState} from "react";
export default function CarForm(){

    const [hits, setHits] = useState([]);

    const getCars = async () => {
        const res = await fetch('/api/search');
        const result = await res.json();
        setHits(result['cars']);
        return result;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch('/api/cars', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        getCars();
        return result;
    }
//FORM VALIDATION
    return (
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
                        <button className="btn btn-secondary col" onClick={getCars}>Show All Cars</button>
                    </div>
                </form>
            </div>
            <div className="col-6 col">
                
                <table className="table .table-bordered">
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
                    </tr>
                    {hits.map((hit) => (
                        <tr key={hit.entityId}>
                            <td>{hit.make}</td>
                            <td>{hit.model}</td>
                            <td>{hit.description}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}