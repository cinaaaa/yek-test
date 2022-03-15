import { setData } from "./dataSlice";


export const initilizeData = () => async dispatch => {

    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
    .then(function(response){
        return response.json();
    })
    .then(function(myJson) {
        // dispatch
        dispatch(setData(myJson))
    });

};