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
        [data]
    );

    return (
        <div className="table__container">
            <table>
                <tr>
                    <th>مقدار جدید</th>
                    <th>مقدار قدیمی</th>
                    <th>فیلد</th>
                    <th>نام اگهی</th>
                    <th>تاریخ</th>
                    <th>نام تغییر دهنده</th>
                    <th>ستاره</th>
                </tr>
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