/* eslint-disable */

export const sortByDate = (
    objectToSort
) => {
    return Object.assign([], objectToSort).sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    }).reverse();
};

export const simpleSort = (
    objectToSort,
    fieldToSort
) => {
    return Object.assign([], objectToSort).sort((a, b) => (a[fieldToSort] > b[fieldToSort]) ? 1 : -1)
};

const binarySearch = (arr, val) => {

    let start = 0;
    let end = arr.length - 1;
    let found_items = [];
  
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
    
        if (arr[mid].date === val) {
            // we have such a lot same date values
            // I didn't found any good practise to handle
            // this with binary search
            // so I just make an loop to found neighbor sames

            found_items.push(arr[mid]);

            // now loop for behinde & after of the result
            let plus_end = 1;
            let neg_end = 1;

            while (plus_end) {
                if (arr[mid + plus_end].date === val) {
                    found_items.push(arr[mid + plus_end]);
                    plus_end += 1;
                } 
                else {
                    // end loop
                    plus_end = 0;
                };
            };

            while (neg_end) {
                if (arr[mid - neg_end].date === val) {
                    found_items.push(arr[mid - neg_end]);
                    neg_end -= 1;
                } 
                else {
                    // end loop
                    neg_end = 0;
                };
            };

        };

        if (val < arr[mid].date) {
            end = mid - 1;
        } 
        else {
            start = mid + 1;
        }
    };

    return found_items;
};

export const searchWorker = (
    objectToSearchIn,
    objectToSearchInSortedbyDate,
    filters,
) => {

    let response = Object.assign([], 
        filters.date ? objectToSearchInSortedbyDate : objectToSearchIn
    );

    // find out the filters key
    // to handle iterate on it later
    let keys = Object.keys(filters);

    // check that if it's date search mode
    // so we return the BST search algo
    if (filters.date) response = binarySearch(response, filters.date);

    // first I filter the object to search (the JSON)
    // check the keys on the object we have already
    let filtered_response = [];
    let every_ones_match;
    for (let i = 0; i < response.length; i++) {
            every_ones_match = keys.every(function(key) {
            // when filter key [value] is null
            // we need to pass true to get every work properly
            if (filters[key] === null) return true;
            if (filters[key] === "") return true;
            if (key.startsWith('sort_')) return true;
            // the filter key value is not null
            // so do the equal check
            if (response[i][key].includes(filters[key])) {
                return true;
            } else {
                return false;
            }
        })
        // pushed the matched one to response array
        if (every_ones_match) {
            filtered_response.push(response[i]);
        };
    };
    // set the result to response
    response = filtered_response;

    // Handle sort things
    if (filters.sort_field) {
        // we have sort filter applied
        // now sort the data by the field we want
        // and the desc we want
        let sorted = simpleSort(response, filters.sort_field);
        response = filters.sort_way === "LH" ? sorted : sorted.reverse();

    }

    return response;

};

export const debounce = (
    func, 
    delay
) => {

    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
    
};