import React, {useEffect, useState, useReducer} from 'react';
import {useImmerReducer} from 'use-immer';

function Testing() {
    const initialState = {
        appleCount: 1,
        bananaCount: 10,
        masage: "Hello",
        happy: false,
    };
    function ReduserFunction(draft, action){
        switch(action.type){
            case 'addApple':
                draft.appleCount = draft.appleCount + 1;
                break;
            case 'changeEverything':   
                draft.bananaCount = draft.bananaCount +10;
                draft.masage = action.customMasage;
                draft.happy = true;
                break;            
        }

    }
    const [state, dispatch] =useImmerReducer(ReduserFunction, initialState)
    return (
      <>
         <div>Righ now the coun of apple is {state.appleCount}</div>
         <div>Righ now the coun of bananas is {state.bananaCount}</div>
         <div>Righ now the masage {state.masage}</div>
         {state.happy ? (<h1>Thank for being happy</h1>) : (<h1>TThera now happines</h1>)}
         <br />
         <button onClick={()=>dispatch({type: "addApple"})}>Add apple</button>
         <br />
         <button onClick={()=>dispatch({type: "changeEverything", customMasage: 'The masage is now coming dispatch '})}>Ghange everything</button>
      </>
    )
}

export default Testing