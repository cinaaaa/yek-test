// Components
import Container from "../../components/Container/Container.component";
import Qoutes from "../../components/Qoutes/Qoutes.component";

// Containers
import SearchContainer from "../../containers/Search/Search.container";
import TableContainer from "../../containers/Table/Table.container";



const HomePage = () => {

    return (
        <Container>

            <Qoutes />

            <SearchContainer />

            <TableContainer />

        </Container>
    );

};

export default HomePage;