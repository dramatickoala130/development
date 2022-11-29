import * as React from 'react';
import './SideBar.css';

export function SideBar() {
    
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
    }

    //abstracted code for replication
    const Checkbox = ({ label, value, onChange }) => {
        return (
          <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
          </label>
        );
      };


    return(
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
                <label>
                    <Checkbox label="Standing" />
                    <br></br>
                    <Checkbox label="Seated" />
                    <br></br>
                    <Checkbox label="Supine" />
                </label>
                <br></br>
                <br></br>
                
                <h4>Benefits</h4>
                <label>
                    <Checkbox label="Hips" />
                    <br></br>
                    <Checkbox label="Back" />
                    <br></br>
                    <Checkbox label="Arms"/>
                    <br></br>
                </label>
                <br></br>

                <h4>Other</h4>
                <label>
                    <Checkbox label="Favorites" value={checked} onChange={handleChange}/>
                    <br></br>
                </label>
                <br></br>
                <br></br>
                
                <span className="total">
                    Favorites Total Seconds to Hold: 
                </span>

            </div>
        </div>
    );
}