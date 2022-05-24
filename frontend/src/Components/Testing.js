import React, {useEffect, useState} from 'react'

function Testing() {
    const [count, setCount] = useState(1);
    
    /* useEffect(()=>{
        console.log("This is useEFFect!")
    }, []) */

    useEffect(()=>{
        console.log(`The curent count is : ${count}`)
    }, [count])

    function IncreaseCount() {
        setCount((current) => current + 1);
    }

    function DecreaseCount() {
        setCount((current) => current - 1);
    } 
    return (
      <>
          <h1>The current count is : {count}</h1>
          <br />
          <button onClick={IncreaseCount}>Increase</button>
          <br />
          <button onClick={DecreaseCount}>Decrease</button>
      </>
    )
}

export default Testing