import Text from "../Text/Text.component";
import "./Button.styles.css";

const Button = ({text}) => (
    <button className="button">
        <Text>
            {text}
        </Text>
    </button>
);

export default Button;