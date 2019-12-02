import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Student from '../pages/Student';
import CreateStudent from '../pages/Student/Crud/createStudent';
import UpdateStudent from '../pages/Student/Crud/updateStudent';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" component={Student} isPrivate />
      <Route path="/createStudent" exact component={CreateStudent} isPrivate />
      <Route path="/updateStudent" exact component={UpdateStudent} isPrivate />
    </Switch>
  );
}
