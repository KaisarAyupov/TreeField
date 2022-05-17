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
  function TooManyDisplay(){
    if (numberOfApples > 10){
      return <h1>Jhon has too many apples</h1>
    }
    else {
      return ''
    }

  }
  return (
    <>
      <div>
        <h1>{AppleDisplay(numberOfApples)}</h1>
      </div>
      <button onClick={IncreaseApple} className="add-btn">Increase</button>
      <button style={{display: numberOfApples<=0 ? "None" : ""}} onClick={DecreaseApple} className="decrease-btn">
        Decrease
      </button>
      {/* {TooManyDisplay()} */}
      {numberOfApples > 10 ? <h1>Jhon has too many apples</h1> : ""}
    </>
  )
}

export default AppleComponent