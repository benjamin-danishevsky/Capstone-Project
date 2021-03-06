import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import SplashPage from './components/SplashPage';
import Tweets from './components/Tweets/index'
import TweetForm from './components/Tweets/NewTweetForm'
import SingleTweet from './components/SingleTweet/index'
import HomePage from './components/HomePage/index'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        {/* <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>

        <Route exact path='/tweets'>
          <Tweets />
        </Route>
        <Route path='/tweets/:id'>
          <SingleTweet />
        </Route>

        <Route exact patch='/home'>
          <HomePage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
