import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Details from "../screens/breakingDetails";
import Home from "../screens/home";

function Navigation() {
     return (
          <BrowserRouter>
               <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={Details} />
                    <Redirect from='*' to='/' />
               </Switch>
          </BrowserRouter>
     );
}

export default Navigation;