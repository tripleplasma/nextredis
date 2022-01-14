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

    return (
        <div>
            <div className="col-3">
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
                    
                    <button type="submit" className="btn btn-primary">Create Car</button>
                </form>
            </div>
            <div className="col-3">
                <button className="btn btn-secondary" onClick={getCars}>Show All Cars</button>
                <ul>
                    {hits.map((hit) => (
                        <li key={hit.entityId}>
                            {hit.make} {hit.model} {hit.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}