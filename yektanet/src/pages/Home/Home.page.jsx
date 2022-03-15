import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

// Components
import Container from "../../components/Container/Container.component";
import Table from "../../components/Table/Table.component";
import Qoutes from "../../components/Qoutes/Qoutes.component";
import Input from "../../components/Input/Input.component";

// Actions
import { initilizeData } from "../../context/actions";

// Utils
import { searchWorker } from "../../utils";

// Containers
import InputsContainer from "../../containers/Inputs/Inputs.container";

const HomePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [slice, setSlice] = useState(20);
    const [filterdData, setFilterdData] = useState([]);
    const [filterInputs, setFilterInputs] = useState({
        title: "",
        name: "",
        date: "",
    });

    const sliceData = useSelector(state => state.data.data);

    const searchFilters = () => {
        // Call the search function
        setFilterdData(searchWorker(
            sliceData,
            filterInputs,
        ));
    };

    useEffect(() => {
        // when filters change
        // this effect will run
        setTimeout(() => {
            searchFilters();
        }, 20);
    }, [filterInputs]);

    useEffect(() => {
        // initilize the redux with reading
        // the json file
        dispatch(initilizeData());
    }, [dispatch]);

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

    // handle logic of data should render
    // depend on that we have filtered data or not
    let dataToRender = sliceData 
        ? filterdData?.[0]
            ? filterdData.slice(0, slice) : 
            // check the filters
            Object.values(filterInputs).some(value => value) ? 
                [] : sliceData.slice(0, slice)
                : [];

    return (
        <Container>

            <Qoutes />

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
            </InputsContainer>

            <Table 
                data={dataToRender}
                reachedEnd={() => setSlice(slice + 20)}
            />

        </Container>
    );
};

export default HomePage;