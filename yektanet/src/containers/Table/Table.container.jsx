import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import Table from "../../components/Table/Table.component";


const TableContainer = () => {

    const [slice, setSlice] = useState(20);
    const [hasFilters, setHasFilters] = useState(false);

    const filteredData = useSelector(state => state.data.filteredData);
    const sliceData = useSelector(state => state.data.data);

    useEffect(() => {
        
        // check that we have filter in query
        setHasFilters(Object.values(
            Object.fromEntries(new URLSearchParams(window.location.search))
        ).some(value => value));

    }, [window.location.search]);


    // handle logic of data should render
    // depend on that we have filtered data or not
    let dataToRender = sliceData 
        ? filteredData?.[0]
            ? filteredData.slice(0, slice) : 
            // check the filters
            hasFilters ? 
                [] : sliceData.slice(0, slice)
                : [];

    return (
        <Table 
            data={dataToRender}
            reachedEnd={() => setSlice(slice + 20)}
        />
    );

};

export default TableContainer;