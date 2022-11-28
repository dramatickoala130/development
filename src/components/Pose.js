import './Pose.css';

export function Pose({item, handleClick}) {

    return(
        <div class="poseCard"> 
            <img src={item.image}></img>
            <p>{item.name}</p> 
            <p>Level: {item.level}</p>
            <p>Type: {item.type}</p>
            <p>Benefit: {item.benefit}</p> 
            <p>Seconds to Hold: {item.time}</p>
            <button onClick={() => handleClick(item.time, item.name)}>Add to Favorites!</button>

        </div>
    );
}
