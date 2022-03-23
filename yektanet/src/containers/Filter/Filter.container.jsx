import { useState,useEffect } from "react";

// Containers
import SearchContainer from "../Search/Search.container";
import TableContainer from "../Table/Table.container";

// Actions
import { setFilteredData } from "../../context/dataSlice";
import { initilizeData } from "../../context/actions";
import { useSelector,useDispatch } from "react-redux";

// Utils
import { searchWorker,debounce } from "../../utils";
import { useHistory } from "react-router-dom";


// Debounced wrap for search worker func
const debouncedSearch = debounce((sliceData, sortedData, filterInputs, cb) => {
    cb(
        searchWorker(sliceData, sortedData, filterInputs)
    );
}, 500);


const FilterContainer = () => {

    const [filterInputs, setFilterInputs] = useState({
        title: "",
        name: "",
        date: "",
        field: "",
        sort_field: "",
        sort_way: "",
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const sliceData = useSelector(state => state.data.data);
    const sliceDataSorted = useSelector(state => state.data.sortedData);

    useEffect(() => {
        // set current queries to filter Inputs
        getCurrentPathSearchQueries();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // initilize the redux with reading
        // the json file
        if (!sliceData.length) {
            dispatch(initilizeData());
        };

        // eslint-disable-next-line
    }, [sliceData]);

    useEffect(() => {
        // when filters change
        // this effect will run

        if (sliceData) {
            // set the queries to path
            setFiltersToPath();

            // here we run a debounced search
            debouncedSearch(
                sliceData,
                sliceDataSorted, 
                filterInputs, (data) => {
                dispatch(setFilteredData(data));
            });
        };

        // eslint-disable-next-line
    }, [filterInputs, sliceData]);

    function getCurrentPathSearchQueries() {
        let shallow_object = {};
        let params = Object.fromEntries(new URLSearchParams(window.location.search));

        Object.keys(params).map((i) =>
            shallow_object[i] = params[i]
        );
        
        setFilterInputs(shallow_object);
    };

    function setFiltersToPath() {
        // convert our object params to query string
        let urlParameters = new URLSearchParams(filterInputs).toString();
        
        // set to path
        history.push({
            pathname: window.location.pathname,
            search: urlParameters
        });
    };

    return (
        <>
            <SearchContainer 
                filterInputs={filterInputs}
                setFilterInputs={setFilterInputs}
            />
            <TableContainer 
                sortFilters={filterInputs}
                setSortFilters={setFilterInputs}
            />
        </>
    );

};

export default FilterContainer;