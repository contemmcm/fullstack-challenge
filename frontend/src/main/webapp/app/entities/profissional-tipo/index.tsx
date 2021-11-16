import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalTipo from './profissional-tipo';
import ProfissionalTipoDetail from './profissional-tipo-detail';
import ProfissionalTipoUpdate from './profissional-tipo-update';
import ProfissionalTipoDeleteDialog from './profissional-tipo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalTipoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalTipoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalTipoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalTipo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProfissionalTipoDeleteDialog} />
  </>
);

export default Routes;
