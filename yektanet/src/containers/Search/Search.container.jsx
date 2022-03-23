import { memo } from "react";

// Components
import Input from "../../components/Input/Input.component";

// Containers
import InputsContainer from "../../containers/Inputs/Inputs.container";


const SearchContainer = ({
    filterInputs,
    setFilterInputs
}) => {    

    return (
        <InputsContainer>
            <Input 
                placeholder="نام تغییر دهنده"
                onChange={(e) => setFilterInputs({...filterInputs, name: e.currentTarget.value})}
                value={filterInputs['name']}
            />
            <Input 
                type="date" 
                placeholder="تاریخ"
                onChange={(e) => setFilterInputs({...filterInputs, date: e.currentTarget.value})}
                value={filterInputs['date']}
            />
            <Input 
                placeholder="نام آگهی"
                onChange={(e) => setFilterInputs({...filterInputs, title: e.currentTarget.value})}
                value={filterInputs['title']}
            />
            <Input 
                placeholder="فیلد"
                onChange={(e) => setFilterInputs({...filterInputs, field: e.currentTarget.value})}
                value={filterInputs['field']}
            />
        </InputsContainer>
    );

};

export default memo(SearchContainer);