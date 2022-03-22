import { useRef,useCallback } from "react";

import Cell from "../Cell/Cell.component";
import "./Table.styles.css";

const Table = ({
    data,
    reachedEnd
}) => {

    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {

            if (observer.current) observer.current.disconnect();
            
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // trigger reachEnd callback
                    reachedEnd();
                }
            });

            if (node) observer.current.observe(node);
        },
        // eslint-disable-next-line
        [data]
    );

    return (
        <div className="table__container">
            <table>
                <thead>
                    <tr>
                        <th scope="col">
                            <a href="#" className="sort-by"> مقدار جدید </a>
                        </th>
                        <th scope="col">
                            <a href="#" className="sort-by"> مقدار قدیمی </a>
                        </th>
                        <th scope="col">
                            <a> فیلد </a>
                        </th>
                        <th scope="col">
                            <a href="#" className="sort-by"> نام آگهی</a>
                        </th>
                        <th scope="col">
                            <a> تاریخ </a>
                        </th>
                        <th scope="col">
                            <a href="#" className="sort-by"> نام تغییر دهنده </a>
                        </th>
                        <th scope="col">
                            <a> ستاره </a>
                        </th>
                    </tr>
                </thead>
                { data?.map((i, index) => {

                    // check if it's last item
                    // to add observer listener to it
                    // so we can notify when last item showed up
                    if (data.length === index + 1) {
                        // it's last item
                        return (
                            <Cell key={i.id} data={i} lastElementRef={lastElementRef} />
                        );
                    } 
                    else {
                        return (
                            <Cell key={i.id} data={i} />
                        );
                    };

                })}
            </table>
        </div>
    );

};

export default Table;