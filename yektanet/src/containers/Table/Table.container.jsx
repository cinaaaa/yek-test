import { useState } from "react";
import { useSelector } from "react-redux";

// Components
import Table from "../../components/Table/Table.component";


const TableContainer = ({
    sortFilters, 
    setSortFilters
}) => {

    const [slice, setSlice] = useState(20);

    const filteredData = useSelector(state => state.data.filteredData);
    const sliceData = useSelector(state => state.data.data);

    const handleSortFilters = (fieldToSort) => {

        // we have three sort condition
        // first is the default ""
        // second is higher to lower "HL"
        // third is lower to higher "LH"
        let sort_condition = "";

        // handle sort conditions
        if (!sortFilters.sort_way) {
            // the field is not sorted in any way
            // so the first sort way is
            // high to low
            sort_condition = "HL";
        };
        if (sortFilters.sort_way === "HL") {
            // high to low
            sort_condition = "LH";
        };
        if (sortFilters.sort_way === "LH") {
            // low to high
            // so should became default again
            // if the value is same like the current
            if (sortFilters.sort_field === fieldToSort) {
                sort_condition = "";
            } else {
                // user decied to sort on a new field
                sort_condition = "HL";
            }
        };

        // new sorted fields object
        let new_sort_object

        if (sort_condition) {
            new_sort_object = {
                ...sortFilters,
                sort_field: fieldToSort,
                sort_way: sort_condition,
            };
        } 
        else {
            new_sort_object = {
                ...sortFilters,
                sort_field: "",
                sort_way: "",
            };
        };

        setSortFilters(new_sort_object);

    };

    // handle logic of data should render
    // depend on that we have filtered data or not
    let dataToRender = sliceData 
        ? filteredData?.[0]
            ? filteredData.slice(0, slice) : 
            // check the filters
            Object.values(sortFilters).some(value=>value) ? 
                [] : sliceData.slice(0, slice)
                : [];

    return (
        <Table 
            data={dataToRender}
            reachedEnd={() => setSlice(slice + 20)}
            onSortClick={handleSortFilters}
        />
    );

};

export default TableContainer;