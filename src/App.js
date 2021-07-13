import {BrowserRouter, Route, Switch} from 'react-router-dom'

import SignInForm from './components/signInFrom'

import HomePage from './components/homePage'

import Popular from './components/popularPage'

import Account from './components/accountDetails'

import SearchBar from './components/SearchBar'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SignInForm} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/popular" component={Popular} />
      <Route exact path="/account-details" component={Account} />
      <Route exact path="/search" component={SearchBar} />
    </Switch>
  </BrowserRouter>
)

export default App
