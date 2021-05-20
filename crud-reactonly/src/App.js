import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import MemberList from './components/MemberList';

function App() {

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
