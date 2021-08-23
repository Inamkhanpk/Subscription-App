
import {
  Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Offer from './components/Offer/Offer'

import OfferList from './components/OfferList/OfferList'
import Company from './components/Company/Company'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { Provider } from "react-redux";
import store from "./store";
import history from './history';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  let persistor = persistStore(store)
  return (
    <div className="App">

<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
    <Router history={history}>
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
           <ProtectedRoute exact path="/company">
            <Company />
          </ProtectedRoute>
          <ProtectedRoute exact path="/offer">
            <Offer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/offerlist">
            <OfferList />
          </ProtectedRoute>
         
       </Switch>

    </Router>
    </PersistGate>
    </Provider>
    </div>
  );
}

export default App;
