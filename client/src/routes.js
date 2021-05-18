import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LogIn from './pages/LogIn/LogIn'
import SignUp from './pages/SignUp/SignUp'
import RecipeBook from './pages/RecipeBook/RecipeBook'
import Search from './pages/Search/Search'
import Preferences from './pages/Preferences/Preferences'

const Routes = () => {
  return (
    <Switch>
      <Route path='/preferences'>
        <Preferences />
      </Route>

      <Route path='/search'>
        <Search />
      </Route>

      <Route path='/recipebook'>
        <RecipeBook />
      </Route>

      <Route path='/signup'>
        <SignUp />
      </Route>

      <Route path='/login'>
        <LogIn />
      </Route>

      <Route path='/' exact>
        <HomePage />
      </Route>
    </Switch>
  )
}

export default Routes
