import { getByDisplayValue } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { dimActions } from "../../stores/dimension";
import React from "react";

function CheckBox(props) {
    const dispatch = useDispatch();
    const checkRef = React.useRef();
    function trigger() {
        dispatch(dimActions.changeValue({ id: props.id, checked: checkRef.current.checked }));
    }
    return (
        <div className="checkBox" onClick={trigger}>
            <input type="checkbox" id={`checkbox${props.value}`} ref={checkRef} />
            <label htmlFor={`checkbox${props.value}`}>{props.value}</label>
        </div>
    );
}
export default CheckBox;