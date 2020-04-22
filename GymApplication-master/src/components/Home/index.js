import React, { Component } from 'react';  
import Carousel from 'react-bootstrap/Carousel';  

export class Home extends Component {  
  render() {  
    return (  
      <div>  
        <div class='container-fluid' >  
          <div className="row title" style={{ marginBottom: "10px" }} >  
            <div class="col-lg-12" id="inner" style={{ backgroundColor: "lightblue", fontSize: '20px' }}>  
            Welcome to our Gym App!
            </div> 
            <div class="col-sm-12" id="inner" style={{ backgroundColor: "lightblue" }}>  
            Here you can view our Fitness Classes Schedule,
            book a Personal Training Session and 
            visit our Store
            </div> 
          </div>  
        </div>  
        <div className='container-fluid' >  
          <Carousel>  
            <Carousel.Item style={{'height':"700px"}} >
              <img style={{'height':"700px"}}  
                className="d-block w-100"  
                src={'personalTrainer.jpg'}  
                /> 
              <Carousel.Caption>  
                <h3>Personal Training</h3>  
              </Carousel.Caption>  
             </Carousel.Item  >  
              <Carousel.Item style={{'height':"700px"}}>  
                <img style={{'height':"700px"}}  
                  className="d-block w-100"  
                  src={'proteinBars.jpeg'}    />  
                <Carousel.Caption>  
                  <h3>Store</h3>  
                </Carousel.Caption>  
              </Carousel.Item>  
              <Carousel.Item style={{'height':"700px"}}>  
                <img style={{'height':"700px"}}  
                className="d-block w-100"  
                  src={'fitnessClass.jpeg'}   />  
                <Carousel.Caption>  
                  <h3>Fitness Classes</h3>  
                </Carousel.Caption>  
            </Carousel.Item>  
          </Carousel>  
        </div>  
      </div>  
    )  
  }  
}  
  
export default Home;  