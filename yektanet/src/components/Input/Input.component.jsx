import "./Input.styles.css";

const Input = ({
    placeholder,
    type="text",
    onChange,
    value
}) => {

    return (
        <input
            className="input"
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );

};

export default Input;