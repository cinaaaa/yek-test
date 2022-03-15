import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

/* Routes */
import HomePage from "./pages/Home/Home.page";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
