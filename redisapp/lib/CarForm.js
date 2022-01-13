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
        <div class="col-3">
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label class="form-label">Brand</label>
                <input name="make" type="text" class="form-control"/>
            </div>

            <div class="mb-3">
                <label class="form-label">Model</label>
                <input name="model" type="text" class="form-control"/>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Image</label>
                <input name="image" type="text" class="form-control"/>
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" type="text" class="form-control"/>
            </div>
            

            <button type="submit" class="btn btn-primary">Create Car</button>
        </form>
        </div>
    );
}