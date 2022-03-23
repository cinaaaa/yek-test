import { useEffect,memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

// Components
import Input from "../../components/Input/Input.component";

// Actions
import { setFilteredData } from "../../context/dataSlice";
import { initilizeData } from "../../context/actions";

// Utils
import { searchWorker,debounce } from "../../utils";

// Containers
import InputsContainer from "../../containers/Inputs/Inputs.container";

// Debounced wrap for search worker func
const debouncedSearch = debounce((sliceData, sortedData, filterInputs, cb) => {
    cb(
        searchWorker(sliceData, sortedData, filterInputs)
    );
}, 500);


const SearchContainer = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const sliceData = useSelector(state => state.data.data);
    const sliceDataSorted = useSelector(state => state.data.sortedData);
    const [filterInputs, setFilterInputs] = useState({
        title: "",
        name: "",
        date: "",
        field: "",
        sort_name: "",
        sort_title: "",
        sort_oldval: "",
        sort_newval: "",
        sort_date: "",
    });

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
        // here we run a debounced search
        debouncedSearch(sliceData, sliceDataSorted, filterInputs, (data) => {
            dispatch(setFilteredData(data));
        });

        // eslint-disable-next-line
    }, [filterInputs]);

    useEffect(() => {
        
        // check that we have data fetched
        // then parse query strings & assign them to filters
        if (sliceData) {
            let shallow_object = {};
            let params = Object.fromEntries(new URLSearchParams(window.location.search));
    
            Object.keys(params).map((i) =>
                shallow_object[i] = params[i]
            );
    
            setFilterInputs(shallow_object);
        };

    }, [sliceData]);


    const setFiltersToPath = (param, e) => {
        
        // new filtered inputs
        let new_filtered = {...filterInputs, [param]: e.currentTarget.value};

        // change state
        setFilterInputs(new_filtered);

        // convert our object params to query string
        let urlParameters = new URLSearchParams(new_filtered).toString();
        
        // set to path
        history.push({
            pathname: window.location.pathname,
            search: urlParameters
        });

    };

    return (
        <InputsContainer>
            <Input 
                placeholder="نام تغییر دهنده"
                onChange={(e) => setFiltersToPath('name', e)}
                value={filterInputs['name']}
            />
            <Input 
                type="date" 
                placeholder="تاریخ"
                onChange={(e) => setFiltersToPath('date', e)}
                value={filterInputs['date']}
            />
            <Input 
                placeholder="نام آگهی"
                onChange={(e) => setFiltersToPath('title', e)}
                value={filterInputs['title']}
            />
            <Input 
                placeholder="فیلد"
                onChange={(e) => setFiltersToPath('field', e)}
                value={filterInputs['field']}
            />
        </InputsContainer>
    );

};

export default memo(SearchContainer);