import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Student from '../pages/Connected/Student';
import CreateStudent from '../pages/Connected/Student/Crud/createStudent';
import UpdateStudent from '../pages/Connected/Student/Crud/updateStudent';

import Enrollment from '../pages/Connected/Enrollment';
import CreateEnrollment from '../pages/Connected/Enrollment/Crud/createEnrollment';
import UpdateEnrollment from '../pages/Connected/Enrollment/Crud/updateEnrollment';

import Plan from '../pages/Connected/Plan';
import CreatePlan from '../pages/Connected/Plan/Crud/createPlan';
import UpdatePlan from '../pages/Connected/Plan/Crud/updatePlan';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" component={Student} isPrivate />
      <Route path="/createStudent" exact component={CreateStudent} isPrivate />
      <Route path="/updateStudent" exact component={UpdateStudent} isPrivate />

      <Route path="/enrollment" component={Enrollment} isPrivate />
      <Route
        path="/createEnrollment"
        exact
        component={CreateEnrollment}
        isPrivate
      />
      <Route
        path="/updateEnrollment"
        exact
        component={UpdateEnrollment}
        isPrivate
      />

      <Route path="/plan" component={Plan} isPrivate />
      <Route path="/createPlan" exact component={CreatePlan} isPrivate />
      <Route path="/updatePlan" exact component={UpdatePlan} isPrivate />
    </Switch>
  );
}
