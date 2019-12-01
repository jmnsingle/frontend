import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Student from '../pages/Student';
import NewStudent from '../pages/NewStudent';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" component={Student} isPrivate />
      <Route path="/student_register" exact component={NewStudent} isPrivate />
    </Switch>
  );
}
