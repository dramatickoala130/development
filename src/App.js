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
  const [names, setNames] = useState([]);
  const [selected, setSelected] = useState('yes'); // controlling the radio buttons
  // const [completeFilterData, setCompleteFilterData] = useState("popular");

  const [typesList, setTypesList] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);





  // lets users select a filter type
  const selectFilterType = eventKey => {
    const checked = eventKey.target.checked;
    const checkedValue = eventKey.target.value;
    console.log(checked)
    console.log(checkedValue)
    // a checkbox was checked, add it to the list of type filters checked
    if (checked === true){
      console.log("entered into true")
      // make deep copy of old list; add the item
      const newTypesList = [...typesList, checkedValue];
      // set the state of the list to the update copy
      setTypesList(newTypesList);

      //only one filter is selected in types
      if(newTypesList.length === 1){
        setType(checkedValue);
      }
      else{
        setType(false);
      }
      
    }else if (checked === false){
      console.log(typesList)
      const removed = typesList.filter(object => { return object !== checkedValue});
      console.log(removed);
      setTypesList(removed);
      if(removed.length === 0) {
        setType("All");
      }else if (removed.length === 1) {
        console.log("REMAINING: " + removed[0]);
        setType(removed[0]);
      }else{
        setType(false);
      }
      
    }
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
  const [checkedState, setCheckedState] = useState(new Array(filteredData.length).fill(false));

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
        if (currentState === true){
          return sum + filteredData[index].time;
        }
        return sum;
      },
      0
    );
    setTotalSeconds(totalSeconds);
  }



  //  // function to handle the adding of the seconds in the favorites section
  //  const handleRadio = event => {
  //   filteredData.sort((a, b) => a.rank - b.rank);
  // LINE OF CODE ABOVE IS THE CODE TO SORT BASED ON WHETHER THE LEVEL RADIO BUTTON IS SELECTED. 

  //     setSelected(event.target.value);
  //  }

   // filtering function for Sorting
  // const matchesSortingType = () => {
  //   if(selected === "popular") { 
  //     return "popular"
  //   } else if (selected === "level") {
  //     return "level"
  //   } else {
  //     return false
  //   }
  // }
   
  // console.log(filteredData.sort((a, b) => a.rank - b.rank))

  // filteredData.sort((a, b) => a.rank - b.rank);


  // function finalData() {
  //     filteredData.sort((a, b) => a.rank - b.rank);
  // }
  





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
                    <input  type="radio"
                            id="popular"
                            name="option"
                            value="popular"
                            checked={selected === 'popular'}
                            // onChange={handleRadio}
                            /> Popular
                    <br></br>
                    <input  type="radio"
                            id="level"
                            name="option"
                            value="level"
                            checked={selected === 'level'}
                            // onChange={handleRadio}
                            /> Level
                </label>
                <br></br>
                <br></br>

                <h4>Types</h4>
                <label> <input type="checkbox" value="Standing" onChange={selectFilterType}/> Standing</label>
                <br></br>
                <label> <input type="checkbox" value="Seated" onChange={selectFilterType}/> Seated</label>
                <br></br>
                <label> <input type="checkbox" value="Supine" onChange={selectFilterType}/> Supine</label>
                <br></br>
                <br></br>
                
                <h4>Benefits</h4>
                <label> <input type="checkbox" value="Hips" onChange={selectFilterType}/> Hips</label>
                <br></br>
                <label> <input type="checkbox" value="Back" onChange={selectFilterType}/> Back</label>
                <br></br>
                <label> <input type="checkbox" value="Arms" onChange={selectFilterType}/> Arms</label>
                <br></br>
                <br></br>

                <h4>Other</h4>
                <label> <input type="checkbox" value="Favorites" onChange={selectFilterType}/> Favorites</label>
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
