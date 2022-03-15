import { setData } from "./dataSlice";
import { sortByDate } from "../utils";


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
        // sort by date then
        // dispatch
        // to handle BST later
        dispatch(setData(sortByDate(myJson)));
    });

};