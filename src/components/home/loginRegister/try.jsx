import React,{useState, useEffect} from "react";

function Example(){
    const[count, setCount]=useState(0);
    useEffect(()=>{
        document.title=`you clicked ${count}times`;
    },[count]);
    return (
        <div>
        <p>You clicked{count}times</p>
        <button  onClick={()=>setCount(count+1)}>
        clikMe
        </button>
        </div>
        
    );
}

export default Example