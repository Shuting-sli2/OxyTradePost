import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

/* https://www.youtube.com/watch?v=TRCDsB9i3bI&t=2545s */
/* make changes */

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
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
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                
                <ul className = "dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
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