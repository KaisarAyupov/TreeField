import React, {useState} from "react";

function AppleComponent() {

const [numberOfApples, setNumberOfApples] = useState(0)

  function AppleDisplay(numberOfApples) {
    if (numberOfApples === 0 || numberOfApples === 1){
      return `Jhon has ${numberOfApples} apple`
    } else if (numberOfApples > 1) {
      return `Jhon has ${numberOfApples} apples`
    } else {
      return `Jhon owes us ${numberOfApples} apples`
    }
  }
  return (
    <div>
      <h1>{AppleDisplay(numberOfApples)}</h1>
    </div>
  )
}

export default AppleComponent