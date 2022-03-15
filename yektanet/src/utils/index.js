export const searchWorker = (
    objectToSearchIn,
    filters,
) => {

    var keys = Object.keys(filters);

    return objectToSearchIn.filter(function(obj) {
        return keys.every(function(key) {
            // when filter key [value] is null
            // we need to pass true to get every work properly
            if (filters[key] === null) return true;
            // the filter key value is not null
            // so do the equal check
            return obj[key].includes(filters[key])
        })
    });

};