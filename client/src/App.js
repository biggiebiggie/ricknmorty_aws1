import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import AddCharacter from "./pages/AddCharacter/AddCharacter";
import UpdateCharacter from "./pages/UpdateCharacter/UpdateCharacter";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

class App extends Component {
  state = {
    auth: {
      loggedIn: false,
      user: null
    }
  }

  authStatus = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    await fetch('http://localhost:9090/api/user/session', options)
      .then(res => res.json())
      .then(res => res.status === 1
        ? this.setState({
          auth: {
            loggedIn: true,
            user: res.user
          }
        })
        : this.setState({
          auth: {
            loggedIn: false,
            user: null
          }
        })
      )
      .catch(error => console.log(error))
  }

  render() {
    const { authStatus, state: { auth } } = this
    console.log(this.state.auth.loggedIn)
    console.log(this.state.auth.user)
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={props => <Header {...props} auth={auth} updateAuth={authStatus} />} />
          </Switch>
          <Switch>
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route path="/login" component={props => <Login {...props} updateAuth={authStatus} />} />
            <Route path="/signup" component={props => <Signup {...props} updateAuth={authStatus} />} />
            <Route path="/reset-password" component={props => <ResetPassword {...props} />} />
            <Route
              path="/profile"
              component={props => <Profile {...props} auth={auth} updateAuth={authStatus} />}
            />

            <Route
              path="/update-user"
              component={props => <UpdateUser {...props} auth={auth} />}
            />
            <Route
              path="/add-character"
              component={props => <AddCharacter {...props} auth={auth} />}
            />
            <Route
              path="/update-character"
              component={props => <UpdateCharacter {...props} auth={auth} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
