export const sortByDate = (
    objectToSort
) => {
    return objectToSort.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    }).reverse();
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
}

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
    response = response.filter(function(obj) {
        return keys.every(function(key) {
            // when filter key [value] is null
            // we need to pass true to get every work properly
            if (filters[key] === null) return true;
            // the filter key value is not null
            // so do the equal check
            return obj[key].includes(filters[key])
        })
    });

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