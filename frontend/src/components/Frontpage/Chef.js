
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Chef() {
    const [chefs, setChefs] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4000/getChef")
      .then((res) => {
        console.log("Data received:", res.data);
        setChefs(res.data.chefs);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  return (
    <div id='Chefs'  class="team">
        <h1>Our<span>Team</span></h1>

        <div class="team_box">
        {chefs.map((chef, index) =>(
                 <div class="profile" key={index}>
                 <img src={`http://localhost:4000/${chef.image}`} />
 
                 <div class="info">
                     <h2 class="name">{chef.chefname}</h2>
                     <p class="bio">{chef.description}</p>
 
                   
                 </div>
             </div>

            ))}
           

            

          
        </div>
     
    </div>


  )
}

export default Chef