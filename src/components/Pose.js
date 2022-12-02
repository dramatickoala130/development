import './Pose.css';

export function Pose({item, id, checked, handleClick}) {

    return(
        <div className="poseCard"> 
            <img src={item.image}></img>
            <p>{item.name}</p> 
            <p>Level: {item.level}</p>
            <p>Type: {item.type}</p>
            <p>Benefit: {item.benefit}</p> 
            <p>Seconds to Hold: {item.time}</p>
            <label>
                <input type="checkbox"
                        id={id}
                        checked={checked}
                        onChange={() => handleClick(id)}/>
                Add to Favorites!
            </label>
            {/* <button onClick={() => handleClick(item.time, item.name)}>Add to Favorites!</button> */}

        </div>
    );
}
//Figure out how to get it so that when I unselect soemthing, it is removed the total and removed the list.
//As well as being able to add a favorites to the list to display.
