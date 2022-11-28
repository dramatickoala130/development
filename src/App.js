import './App.css';
import { useState } from "react";
import poseData from "./assets/yoga-poses-data.json";
import {Pose} from "./components/Pose";
function App() {
  // const [type, setType] = useState("All");
  const [names, setNames] = useState([]);

  function handleClick(name) {
    setNames([...names, name])
  }
   
  return (
    <div className="App">
      <div className= "topBar">
        <img src="./images/topPhoto.png"></img>
        <h1>Yoga Poses</h1> 
      </div>
     
      <div>
        
      </div>
  


      {poseData.map((item, index) => ( 
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
