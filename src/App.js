import './App.css';
import * as React from 'react';
import { useState } from "react";
import poseData from "./assets/yoga-poses-data.json";
import {Pose} from "./components/Pose";
import {SideBar} from "./components/SideBar";
import Nav from 'react-bootstrap/Nav';


function App() {
  const [type, setType] = useState("All");
  const [names, setNames] = useState([]);

  // lets users select a filter type
  const selectFilterType = eventKey => {
    setType(eventKey);
  };


  // filtering function
  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) {
      return true
    } else if (type === item.benefit) {
      return true
    } else {
      return false
    }
  }

  const filteredData = poseData.filter(matchesFilterType)

  

  

  // for favorites button right now
  function handleClick(name) {
    setNames([...names, name])
  }

  // Checkbox checking, might not use
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
      setChecked(!checked);
  }

  //checkbox stencil code
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  
  
   
  return (
    <div className="App">
      <div className= "topBar">
        <img src="./images/topPhoto.png"></img>
        <h1>Yoga Poses</h1> 
      </div>
     
     
      <div className="container"> 
            <div className="sidebar">
                
                <h4>Sort By</h4>
                <label>
                    <input type="radio"/> Popular
                    <br></br>
                    <input type="radio"/> Level
                </label>
                <br></br>
                <br></br>

                <h4>Types</h4>
                <Nav onSelect={selectFilterType}>
                  <Nav.Item> <Nav.Link eventKey="Standing"> Standing</Nav.Link> </Nav.Item>
                </Nav>
                <Nav onSelect={selectFilterType}>
                <Nav.Item> <Nav.Link eventKey="Seated"> Seated</Nav.Link> </Nav.Item>
                </Nav>
                <Nav onSelect={selectFilterType}>
                <Nav.Item> <Nav.Link eventKey="Supine"> Supine</Nav.Link> </Nav.Item>
                </Nav>
                <br></br>
                
                <h4>Benefits</h4>
                <Nav onSelect={selectFilterType}>
                  <Nav.Item> <Nav.Link eventKey="Hips"> Hips</Nav.Link> </Nav.Item>
                </Nav>
                <Nav onSelect={selectFilterType}>
                  <Nav.Item> <Nav.Link eventKey="Back"> Back</Nav.Link> </Nav.Item>
                </Nav>
                <Nav onSelect={selectFilterType}>
                  <Nav.Item> <Nav.Link eventKey="Arms"> Arms</Nav.Link> </Nav.Item>
                </Nav>
                <br></br>

                <h4>Other</h4>
                <Nav onSelect={selectFilterType}>
                  <Nav.Item> <Checkbox label="Favorites" eventKey="Favorites"/> </Nav.Item>
                </Nav>
                
                <br></br>
                <br></br>
                
                <span className="total">
                    Favorites Total Seconds to Hold: 
                </span>

            </div>
        </div>



  


      {filteredData.map((item, index) => ( 
         <Pose key={item} item={item} handleClick={handleClick}/>
      ))}


      {/* <p>Total Price: ${totalPrice}</p> */}
      <div>
        <h2>Cart</h2>
        {names.length == 0 ? null : names.map(
          str => <p>{str}</p>
        )}
      </div>
    </div>
  );
}

export default App;
