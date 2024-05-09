import React, { useEffect, useState } from 'react';
import axios from 'axios';
import menu from '../assets/food_1.png';

function Gallery({ setSelectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/getCategory")
            .then((res) => {
                console.log("Data received:", res.data);
                setCategories(res.data.categories);
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []);

    const handleClick = (category) => {
        setSelectedCategory(category); // Update the selected category
    };

    return (
//         <div className="gallery" id="Gallery">
//             <h1 style={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '2rem', marginBottom: '2rem' }}>Our <span style={{ color: 'blue' }}>Gallery</span></h1>

//             <div className="gallery_image_box" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//                 {/* Option for All */}
//                 <div onClick={() => handleClick("All")} className="gallery_image" style={{ width: '300px', height: '300px', margin: '1rem', cursor: 'pointer', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
//                     <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
//                         <img style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} src={menu} alt={`All Categories`} />
//                         <div style={{ padding: '1rem', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '0 0 10px 10px' }}> <h5>All</h5> </div>
//                     </div>
//                 </div>

//                 {/* Categories */}
//                 {categories.map((category, index) => (
//                     <div onClick={() => handleClick(category.category)} className="gallery_image" key={index} style={{ width: '300px', height: '300px', margin: '1rem', cursor: 'pointer', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
//                         <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
//                             <img style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} src={`http://localhost:4000/${category.image}`} alt={`Category ${category.category}`} />
//                             <div style={{ padding: '1rem', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '0 0 10px 10px' }}> <h5>{category.category}</h5> </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Gallery;
<div className="gallary" id="Gallary">
<h1>Our<span>Gallery</span></h1>

<div className="gallary_image_box">
    {/* Option for All */}
    <div onClick={() => handleClick("All")} className="gallary_image">
        <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ width: '100%', height: 'auto' }} src={menu} alt={`All Categories`} />
            <div style={{ padding: '1rem', color: 'white' }}> <h5>All</h5> </div>
        </div>
    </div>

    {/* Categories */}
    {categories.map((category, index) => (
        <div onClick={() => handleClick(category.category)} className="gallary_image" key={index}>
            <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                <img style={{ width: '100%', height: 'auto' }} src={`http://localhost:4000/${category.image}`} alt={`Category ${category.category}`} />
                <div style={{ padding: '1rem', color: 'white' }}> <h5>{category.category}</h5> </div>
            </div>
        </div>
    ))}
</div>
</div>
);
}


export default Gallery;