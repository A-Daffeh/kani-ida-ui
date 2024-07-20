import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from "../header/Header";
import axios from 'axios';

const AddNewProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    
    formData.append('productRequest', new Blob([JSON.stringify({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      availability: data.availability === 'true'
    })], { type: 'application/json' }));

    formData.append('file', data.file[0]);

    try {
      const response = await axios.post(`http://localhost:8080/api/admin/products/create/`.append(data.category), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data);
      reset();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
      <Header pageTitle="Products" />
      <div className="container form-container">
        <div className="register" id="register">
          <h2 className="text-danger text-center my-5">Add New Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="file">
                  Image URL
                </label>
                <input type="file" className="form-control" id="file" {...register('file', { required: true })} />
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input type="text" className="form-control" id="name"  {...register('name', { required: true })}/>
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="price">
                  Price $
                </label>
                <input type="number" className="form-control" id="price" step="0.01" {...register('price', { required: true })}/>
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="availability">
                  Availability
                </label>
                <select className="form-control" id="availability" {...register('availability', { required: true })}>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="category">
                  Category
                </label>
                <select className="form-control" id="category" {...register('category', { required: true })}>
                  <option value="">Select Category</option>
                  <option value="1">Spice</option>
                  <option value="2">Vegetable</option>
                  <option value="3">Fruit</option>
                </select>
              </div>

              <div className="col-md-12 text-dark">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea className="form-control" id="description" rows="4" {...register('description', { required: true })}></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-5">
              <button className="btn btn-danger" type="submit">
                Create
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
