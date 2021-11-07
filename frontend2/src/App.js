import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SigninScreen from './screens/SigninScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import PostListScreen from './screens/PostListScreen';

/* https://www.youtube.com/watch?v=TRCDsB9i3bI&t=2545s */
/* make changes */

function App() {
  // useSelector is a function that takes the current state as an argument and returns whatever data you want from it
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      {
        userInfo ? (
          <div className="grid-container">
            <header className="row">
              <div>
                <a className="brand" href="/">
                  OxyTradePost
                </a>
              </div>
              <Link to="/post">Post an Item</Link>
              <div>
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                    <li>
                      <Link to="/postlist">My Posts</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <main>
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <Route path="/" component={HomeScreen} exact></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/post" component={CreateProductScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/postlist" component={PostListScreen}></Route>
            </main>
            <footer className="row center">All right reserved</footer>
          </div>
        ) : (
          <div className="grid-container">
            <header className="row">
              <div>
                <a className="brand" href="/">
                  OxyTradePost
                </a>
              </div>
              <div >
              <Link to="/signin">Sign In</Link>
              <Link to="/register">Register</Link>
              </div>
            </header>
            <main>
              <Route path="/" component={WelcomeScreen} exact></Route>
              <Route path="/signin" component={SigninScreen} exact></Route>
              <Route path="/register" component={RegisterScreen} exact></Route>
            </main>
            <footer className="row center">All right reserved</footer>
          </div>
        )
      }
    </BrowserRouter>
  );
}
export default App;
// test github chat