import Recepie from './Components/Recepie';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Addreceipe from './Components/Addrecepie';
import Updaterecepie from './Components/Updaterecepie';
import Nopage from './Components/Nopage';
import DashBoard from './Components/Dashboard';


function App() {
  return (
    <div className="App">
        <Switch>
         <Route exact path="/">
             <DashBoard/>
         </Route>

          <Route path="/recepie">
            <Recepie/>
          </Route>

          <Route path="/details">
             <Redirect to ="/recepie"/>
          </Route>

         <Route path="/add">
            <Addreceipe />
         </Route>

         <Route path="/edit/:id/">
            <Updaterecepie/>
         </Route>
          <Route path="**">
              <Nopage/>
          </Route>

       </Switch>
    </div>
  );
}

export default App;