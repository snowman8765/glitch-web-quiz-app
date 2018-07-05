import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Sample from './Sample';
import Auth from './Auth';
import Login from './Login';

const routes = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Auth>
          <Switch>
            <Route path="/" component={Sample} />
          </Switch>
        </Auth>
      </Switch>
    </App>
  </BrowserRouter>
);

export default routes;
