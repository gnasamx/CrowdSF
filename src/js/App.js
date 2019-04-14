import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CampaignDetails from './pages/CampaignDetails'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/:camp" component={CampaignDetails} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
)
