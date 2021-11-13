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
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SearchScreen from './components/SearchScreen';
import SearchBox from './components/SearchBox';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

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
        <div className="grid-container">
          <header className="row">
            <div>
              <a className="brand" href="/">
                OxyTradePost
              </a>
            </div>
            <Link to="/post">Post an Item</Link>
            <div>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                    <li>
                      <Link to="/postlist">My Posts</Link>
                    </li>
                    <li>
                      <Link to="/support">Inbox</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin"></Link>
              )}
            </div>
          </header>
          <main>
            <PrivateRoute path="/product/:id" component={ProductScreen} exact></PrivateRoute>
            <PrivateRoute path="/" component={HomeScreen} exact></PrivateRoute>
            <Route path="/signin" component={SigninScreen}></Route>
            <PrivateRoute path="/post" component={CreateProductScreen}></PrivateRoute>
            <Route path="/register" component={RegisterScreen}></Route>
            <PrivateRoute path="/postlist" component={PostListScreen}></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <PrivateRoute path="/support" component={SupportScreen}></PrivateRoute>
          </main>
          <footer className="row center">
            <div>All right reserved</div>{' '}
          </footer>
        </div>
      }
    </BrowserRouter>
  );
}
export default App;