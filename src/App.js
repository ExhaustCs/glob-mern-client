import TopBar from './components/topbar/TopBar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import SinglePage from './pages/singlePage/SinglePage';
import Write from './pages/write/Write';
import { Context } from './context/Context';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/register'>
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/settings'>
          <Settings />
        </Route>
        <Route exact path='/write'>
          {user ? <Write /> : <Home />}
        </Route>
        <Route exact path='/post/:postId'>
          <SinglePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
