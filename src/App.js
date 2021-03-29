// import RikshawForm from './RikchawForm/RikshawForm';
import RikshawForm from './RikchawForm/RikshawForm';
import logo from './Logo/unclefixer-logo.png';
import { Switch,Route,Link } from 'react-router-dom';
import './App.css';
import RikshawTable from "./RickshawTable/RikshawTable";  
function App() {
  return (
    <div className="App">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={logo} />
          </Link>
        </div>    
        <Switch>
          <Route exact path="/" component={RikshawForm} />
          <Route exact path="/detail" component={RikshawTable} />
        </Switch>
    </div>
  );
}

export default App;
