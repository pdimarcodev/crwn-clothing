import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'; 
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
    // user is signed in
    if (userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot =>{
         setCurrentUser({
            id:  snapShot.id,
           ...snapShot.data()
            })
        // see user: 
        //console.log(this.state); 
      })
    } else {
    // user is not signed in
    setCurrentUser(userAuth);
    }
    });
  }
 
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div >
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/signin' render={() => 
          this.props.currentUser ? 
          (<Redirect to="/" />) :  
          (<SignInAndSignUpPage />) } />

      </Switch>
    </div>
  )};  
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
