import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';
import bg2 from '../Images/bg2.jpg'

function Slides() {
  return (
    <Carousel style={{width:'100%' ,height:'100%',position:'absolute',paddingBottom:'300px'}}>
        {/* <Carousel.Item interval={2000} style={{width:'100%'}}>
        <div className='homeContent container' style={{display:'flex',flexDirection:'row'}}> */}
                {/* <div className='textDiv'>

                <span className='smallText'>
                    We Create 
                </span>
                

                
                <h1 className='homeTitle'>
                    THE BEST
                </h1>
                <p style={{color:'black' ,fontFamily:'"Poppins", sans-serif',fontWeight:'600'}}>"Embark on a culinary adventure where flavors dance, textures sing,<br></br> and every bite whispers tales of tradition and innovation."</p>
                </div> */}
                

                {/* <div>
                <img src={bg2}style={{height:'100%',width:'50%',objectFit:'contain'}}></img>
                
              </div> */}


                {/* </div>
      </Carousel.Item> */}
      
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide1} alt='Second slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide2} alt='Thrd slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide3} alt='Forth slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slides;
