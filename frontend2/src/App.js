import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

/* https://www.youtube.com/watch?v=TRCDsB9i3bI&t=2545s */
/* make changes */

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin; 
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            OxyTradePost
          </a>
        </div>
        <div>
          {
            userInfo ? (
              <Link to ="#">{userInfo.name}</Link>
            ): (
              <Link to = "/signin">Sign In</Link>
            )
          }
          

        </div>
      </header>
      <main>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}
export default App;