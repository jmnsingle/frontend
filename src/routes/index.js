import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Student from '../pages/Connected/Student';
import FormStudent from '../pages/Connected/Student/Form/form';

import Enrollment from '../pages/Connected/Enrollment';
import FormEnrollment from '../pages/Connected/Enrollment/Form/form';

import Plan from '../pages/Connected/Plan';
import FormPlan from '../pages/Connected/Plan/Form/form';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" exact component={Student} isPrivate />
      <Route path="/student/create" exact component={FormStudent} isPrivate />
      <Route path="/student/edit/:id" exact component={FormStudent} isPrivate />

      <Route path="/enrollment" exact component={Enrollment} isPrivate />
      <Route
        path="/enrollment/create"
        exact
        component={FormEnrollment}
        isPrivate
      />
      <Route
        path="/enrollment/edit/:id"
        exact
        component={FormEnrollment}
        isPrivate
      />

      <Route path="/plan" exact component={Plan} isPrivate />
      <Route path="/plan/create" exact component={FormPlan} isPrivate />
      <Route path="/plan/edit/:id" exact component={FormPlan} isPrivate />
    </Switch>
  );
}
