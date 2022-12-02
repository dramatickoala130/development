import './App.css';
import * as React from 'react';
import { useState } from "react";
import poseData from "./assets/yoga-poses-data.json";
import {Pose} from "./components/Pose";


function App() {
  const [type, setType] = useState("All"); // displays all poses
  const [totalSeconds, setTotalSeconds] = useState(0); // displays total seconds to hold in favorites
  const [names, setNames] = useState([]);
  const [selected, setSelected] = useState('popular'); // controlling the radio buttons
  const [typesList, setTypesList] = useState([]);


  // lets users select a filter type
  const selectFilterType = eventKey => {
    const checked = eventKey.target.checked;
    const checkedValue = eventKey.target.value;
    // a checkbox was checked, add it to the list of type filters checked
    if (checked === true){
      const newTypesList = [...typesList, checkedValue];
      setTypesList(newTypesList);

      //only one filter is selected in types
      if(newTypesList.length === 1){
        setType(checkedValue);
      }
      else{
        setType(false);
      }
    }else if (checked === false){
      const removed = typesList.filter(object => { return object !== checkedValue});
      setTypesList(removed);
      if(removed.length === 0) {
        setType("All");
      }else if (removed.length === 1) {
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
      console.log("Reached Favorites")
      return false
    } else {
      return false
    }
  }
  const filteredData = poseData.filter(matchesFilterType);


  // checking the state of the checkboxes for the favorites option
  const [checkedState, setCheckedState] = useState(new Array(filteredData.length).fill(false));

  // function to handle the adding of the seconds in the favorites section
  const handleClick = (id, name, checked) => {
    // marking the poses that have been added to favorites as true in the array
    const updatedCheckState = checkedState.map((item, index) => {
      if (filteredData[index].name === name){

        const isFound = names.some(element => {
          if (element === name) {
            return true;
          }
          return false;
        });
        //add it if its not there, remove it if it is
        if(isFound){
          setNames(current => current.filter(object => {return object !== name}));
        } else if (!isFound){
          setNames([...names, name])
        }
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

  // function to handle the radio buttons
   const handleRadio = event => {
    setSelected(event.target.value);
    filteredData();
   }
  
  // SORTING FUNCTION CODE
  // completeFilterData.sort((a, b) => a.rank - b.rank);

  
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
                            onChange={handleRadio}
                            /> Popular
                    <br></br>
                    <input  type="radio"
                            id="level"
                            name="option"
                            value="level"
                            checked={selected === 'level'}
                            onChange={handleRadio}
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
        <h2>Favorites List</h2>
        {names.length == 0 ? null : names.map(
          pose => <p>{pose}</p>
        )}
      </div>
    </div>
  );
}

export default App;
