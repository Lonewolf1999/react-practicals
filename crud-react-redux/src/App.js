import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import AddMember from './components/AddMember'
import EditMember from './components/EditMember'
import MemberList from './components/MemberList'
import store from './redux/store'
import { Provider } from 'react-redux'


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/edit-member">
              <EditMember />
            </Route>
            <Route path="/add-member">
              <AddMember />
            </Route>
            <Route path="/">
              <MemberList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;