import { useState } from "react";

const Cell = ({data, lastElementRef}) => {

    const [starredFields, setStarredFields] = useState(JSON.parse(localStorage.getItem('starredFields')) || []);

    const isStarred = (item) => {
        return starredFields.includes(item);
    };

    const starItem = (item) => {
        let starredFields_fetched = JSON.parse(localStorage.getItem('starredFields'));
        localStorage.setItem('starredFields' , JSON.stringify([...starredFields_fetched, item]));

        setStarredFields([...starredFields_fetched, item]);
    };

    const removeStarItem = (item) => {
        let starredFields_fetched = JSON.parse(localStorage.getItem('starredFields'));
        let fields = starredFields_fetched.filter((i) => i !== item );

        localStorage.setItem('starredFields' , JSON.stringify(fields) );
        setStarredFields(fields);
    };

    return (
        <tr ref={lastElementRef}>
            <td>{data.new_value}</td>
            <td>{data.old_value}</td>
            <td>{data.field}</td>
            <td>{data.title}</td>
            <td>{data.date}</td>
            <td>{data.name}</td>
            <td>
                <input 
                    type='checkbox' 
                    checked={isStarred(data.id)}
                    onChange={() => isStarred(data.id) ? removeStarItem(data.id) : starItem(data.id)}
                />
            </td>
        </tr>
    );

};

export default Cell;