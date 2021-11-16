import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Profisional from './profissional';
import ProfisionalDetail from './profissional-detail';
import ProfisionalUpdate from './profissional-update';
import ProfisionalDeleteDialog from './profissional-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfisionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfisionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfisionalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Profisional} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProfisionalDeleteDialog} />
  </>
);

export default Routes;
