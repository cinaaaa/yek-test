import { useEffect,memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

// Components
import Input from "../../components/Input/Input.component";

// Actions
import { setFilteredtData } from "../../context/dataSlice";
import { initilizeData } from "../../context/actions";

// Utils
import { searchWorker,debounce } from "../../utils";

// Containers
import InputsContainer from "../../containers/Inputs/Inputs.container";

// Debounced wrap for search worker func
const debouncedSearch = debounce((sliceData, filterInputs, cb) => {
    cb(
        searchWorker(sliceData, filterInputs)
    );
}, 500);


const SearchContainer = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const sliceData = useSelector(state => state.data.data);
    const [filterInputs, setFilterInputs] = useState({
        title: "",
        name: "",
        date: "",
        field: "",
    });

    useEffect(() => {
        // initilize the redux with reading
        // the json file
        dispatch(initilizeData());

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // when filters change
        // this effect will run
        // here we run a debounced search
        debouncedSearch(sliceData, filterInputs, (data) => {
            dispatch(setFilteredtData(data));
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
                placeholder="فیلد"
                onChange={(e) => setFiltersToPath('field', e)}
                value={filterInputs['field']}
            />
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
        </InputsContainer>
    );

};

export default memo(SearchContainer);