import RikshawForm from './RikchawForm/RikshawForm';
import { Switch,Route,Link } from 'react-router-dom';
import './App.css';
import RikshawTable from "./RickshawTable/RikshawTable";
import Header from './Layouts/Header';
import Area from './Component/Area/Area';
import Details from './Component/DriverDetails/Details';

const MainRoutes = () =>{
    return (<>
      <Header/>
      <Switch>
          <Route exact path="/dashboard" component={RikshawForm} />
          <Route exact path="/dashboard/detail" component={RikshawTable} />
          <Route exact path="/dashboard/area" component={Area} />
          <Route exact path="/dashboard/details/:id" component={Details} />
      </Switch>
  </>  );
}

export default MainRoutes;
