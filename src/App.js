
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import './App.css';
import Login from "./Auth/Login";
import 'semantic-ui-css/semantic.min.css'
import useLocalStorage from "./LocalStorageHook";
import PrivateRoute from "./PrivateRoutes";
import MainRoutes from "./MainRoutes";
 
function App() {
  return (
    <div className="App">
        <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute  path="/dashboard" component={MainRoutes}  />
        </Switch>
        </Router>
    </div>
  );
}

export default App;
