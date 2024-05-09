import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'

function FoodUpdate() {
 
  const [foodname, setFoodName] = useState('');
  const [image, setImage] = useState(null); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category ,setCategory] =useState('')// Use null instead of empty string for file
  const { id } = useParams();
  const navigate = useNavigate();


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/categoryName')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/getUserFood/${id}`)
      .then((res) => {
        const categoryData = res.data; // Assuming the response contains the department data
        setFoodName(categoryData.foodname);
        setDescription(categoryData.description);
        setImage(categoryData.image);
        setPrice(categoryData.price);
        setCategory(categoryData.category)// Assuming image is a URL or a base64 string
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(); // Move the declaration here
  //   formData.append('foodname', foodname);
  //   formData.append('description', description);
  //   formData.append('image', image); // Append the file object
  //   formData.append('price', price);
  //   formData.append('category', category);

  //   if (!formData.get('foodname') || !formData.get('description') || !formData.get('image')|| !formData.get('price') || !formData.get('category')) {
  //     alert("Please fill in all fields");
  //     return; // Exit early if any field is empty
  //   }

  //   axios.put(`http://localhost:4000/updateFood/${id}`, formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("Success");
  //       navigate("/foodTable");
  //     })
  //     .catch((err) => {
  //       console.error("Error editing Food:", err);
  //     });
  // }
  const handleEdit = (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    if (!foodname || !description || !price || !category) {
      alert("Please fill in all fields");
      return;
    }
  
    // Check if the image is not selected
    if (!image) {
      alert("Please select an image");
      return;
    }
  
    // Check if the category is selected
    if (!category) {
      alert("Please select a category");
      return;
    }
  
    // Create a FormData object and append form data
    const formData = new FormData();
    formData.append('foodname', foodname);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('category', category);
  
    axios.put(`http://localhost:4000/updateFood/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate("/foodTable");
      })
      .catch((err) => {
        console.error("Error editing Food:", err);
      });
  }
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state with the selected file
  }

  return (
    <div className='form-bg'>
      <div>  <NAV/></div>
      
     
    <div className='background'style={{height:'100vh'}} >
      <div><Sidebar/></div>
     
      <div className='categoryform'>
       
        <form onSubmit={handleEdit}>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Category Form</h3> <br></br>
          <input className="foodname" type="text" name="category" placeholder="foodname" value={foodname} onChange={(e) => setFoodName(e.target.value)} /> <br></br>
          <input className="description" type="text" name="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} /> <br></br>
          <input className="image" type="file" name="image" onChange={handleImageChange} /> <br></br>
          <input className="price" type="number" name="price" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} /> <br></br>
          <select
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <br />

          <button className="submit" type="submit">Edit</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default FoodUpdate;
