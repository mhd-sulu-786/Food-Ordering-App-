import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import '../Category/category.css';
import Sidebar from '../Sidebar/Sidebar';

const FoodForm = () => {
  const [formData, setFormData] = useState({
    foodname: '',
    image: null,
    description: '',
    price: '',
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/categoryName')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/foodName')
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.foodname || !formData.image || !formData.description || !formData.price || !formData.category) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('foodname', formData.foodname);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);

      await axios.post('http://localhost:4000/food', formDataToSend);
      console.log('Food added successfully');
      alert('Food added successfully');
      navigate('/foodTable');
      // You can redirect or perform any other action upon successful form submission
    } catch (error) {
      console.error('Error adding Food: ', error);
      alert('Error adding Food: ', error.message);
    }
  };

  return (
    <div className='form-bg'>
      <NAV />
      <div className='background' style={{height:'100vh'}}>
        <Sidebar />
        <div className='categoryform'>
          <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center' }}>Food Form</h3>
            <input
              className="foodname"
              type="text"
              name="foodname"
              placeholder="Add foodname"
              value={formData.foodname}
              onChange={handleChange}
            />
            <br />
            <input
              className="image"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <br />
            <input
              className="description"
              type="text"
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
            />
            <br />
            <input
              className="price"
              type="number"
              name="price"
              placeholder="price"
              value={formData.price}
              onChange={handleChange}
            />
            <br />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <br />
            <button
              className="submit"
              type="submit"
              style={{
                padding: '5px 13px 5px 13px',
                background: '#0d96f0',
                borderRadius: '1rem',
                border: 'none',
                color: 'white'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodForm;
