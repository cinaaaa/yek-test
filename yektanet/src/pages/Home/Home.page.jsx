// Components
import Container from "../../components/Container/Container.component";
import Qoutes from "../../components/Qoutes/Qoutes.component";

// Containers
import FilterContainer from "../../containers/Filter/Filter.container";

const HomePage = () => {

    return (
        <Container>

            <Qoutes />

            <FilterContainer />

        </Container>
    );

};

export default HomePage;