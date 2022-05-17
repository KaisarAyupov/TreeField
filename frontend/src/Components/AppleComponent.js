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
  function IncreaseApple() {
    setNumberOfApples((curentvalue) => curentvalue+1);
  }
  function DecreaseApple() {
    setNumberOfApples((curentvalue) => curentvalue-1);
  }
  return (
    <>
      <div>
        <h1>{AppleDisplay(numberOfApples)}</h1>
      </div>
      <button onClick={IncreaseApple} className="add-btn">Increase</button>
      <button onClick={DecreaseApple} className="decrease-btn">Decrease</button>
    </>
  )
}

export default AppleComponent