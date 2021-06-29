import ListingTable from "./components/ListingTable";
import store from './redux/store'
import { Provider } from 'react-redux'
import './css/table.css'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ListingTable />
      </Provider>
    </div>
  );
}

export default App;