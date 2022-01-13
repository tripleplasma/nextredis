export default function CarForm(){

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
    }

    return (
        <div className="col-3">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Brand</label>
                <input className="make" type="text" class="form-control"/>
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
    );
}