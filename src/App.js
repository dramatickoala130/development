import './App.css';
import * as React from 'react';
import { useState } from "react";
import poseData from "./assets/yoga-poses-data.json";
import {Pose} from "./components/Pose";
import {SideBar} from "./components/SideBar";
import Nav from 'react-bootstrap/Nav';


function App() {
  const [type, setType] = useState("All"); // displays all poses
  const [totalSeconds, setTotalSeconds] = useState(0); // displays total seconds to hold in favorites
  const [list, setList] = useState([]); // initialize an empty array
  const [names, setNames] = useState([]);

  // lets users select a filter type
  const selectFilterType = eventKey => {
    setType(eventKey);
  };

  // filtering function for TYPES and BENEFITS
  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) {
      return true
    } else if (type === item.benefit) {
      return true
    } else if (type === "Favorites") {
      return false
    } else {
      return false
    }
  }

  // filters the complete data everytime the eventKey has been changed
  const filteredData = poseData.filter(matchesFilterType)

  // checking the state of the checkboxes for the favorites option
  const [checkedState, setCheckedState] = useState(new Array(poseData.length).fill(false));

  // function to handle the adding of the seconds in the favorites section
  const handleClick = (position) => {
    // marking the poses that have been added to favorites as true in the array
    const updatedCheckState = checkedState.map((item, index) => {
      if (index === position){
        return !item;
      } else {
        return item;
      }
    });
    // combining the total seconds of the poses that have been added to favorites
    setCheckedState(updatedCheckState);
    const totalSeconds = updatedCheckState.reduce(
      (sum, currentState, index) => {
        console.log(index)
        if (currentState === true){
          console.log(poseData[index].time)
          return sum + poseData[index].time;
        }
        return sum;
      },
      0
    );
    setTotalSeconds(totalSeconds);
  }









   // // function populate favorites list
  // function addToList(item) {
  //   // make deep copy of old list; add the item
  //   const newList = [...list, item];
  //   // set the state of the list to the update copy
  //   setList(newList);
  // }

  // // Checkbox checking, might not use
  // const [checked, setChecked] = React.useState(false);
  // const handleChange = () => {
  //     setChecked(!checked);
  // }
  //checkbox stencil code WILL USE LATER
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
                  <Nav.Item> <Nav.Link eventKey="Favorites"> Favorites</Nav.Link> </Nav.Item>
                </Nav>
                <br></br>
                
                <span className="total">
                    Favorites Total Hold Time: {totalSeconds}seconds
                </span>

            </div>
        </div>



      {/* SHOWING ALL THE DATA ON THE SCREEN */}
      {filteredData.map((item, index) => ( 
         <Pose key={item} item={item} id={index} checked={checkedState[index]} handleClick={handleClick}/>
      ))}


      <div>
        <h2>Must populate favorites list</h2>
        {names.length == 0 ? null : names.map(
          time => <p>cost: {time}</p>
        )}
      </div>
    </div>
  );
}

export default App;
