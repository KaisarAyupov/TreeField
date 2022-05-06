import React from 'react'

function AppleComponent() {
  function AppleDisplay(n) {
    if (n === 0 || n === 1){
      return `Jhon has ${n} apple`
    } else if (n > 1) {
      return `Jhon has ${n} apples`
    } else {
      return `Jhon owes us ${n} apples`
    }
  }
  return (
    <div>
      <h1>{AppleDisplay(5)}</h1>
    </div>
  )
}

export default AppleComponent