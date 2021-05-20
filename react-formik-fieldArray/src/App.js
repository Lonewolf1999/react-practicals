import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import UsersList from "./components/UsersList";

const LazyEditUser = React.lazy(() => import('./components/EditUser'))
const LazyAddUser = React.lazy(() => import('./components/AddUser'))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <React.Suspense fallback='Loading'>
          <Router>
            <Switch>
              <Route path="/edit-user">
                <LazyEditUser />
              </Route>
              <Route path="/add-user">
                <LazyAddUser />
              </Route>
              <Route path="/">
                <UsersList />
              </Route>
            </Switch>
          </Router>
        </React.Suspense>
      </Provider>
    </div>
  );
}

export default App;