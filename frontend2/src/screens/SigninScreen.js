import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // setPassword is called in input tag: onChange={(e) => setPassword(e.target.value)}

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();// prevent page refresh after user submits the form
    dispatch(signin(email, password));
  };

  // redirect user to where they want to be directed or homescreen
  // ex. signin?redirect=shipping
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo, loading, error} = userSignin; 
  // dispatch(getTalkSession)


  // console.log(userInfo); 
  /* data sent by signin router server
  _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
  */
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Please use Oxy email to sign in or sign up.</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant = "danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}