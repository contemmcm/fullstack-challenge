import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './profissional-tipo.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfissionalTipoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const profissionalTipoEntity = useAppSelector(state => state.profissionalTipo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profissionalTipoDetailsHeading">ProfissionalTipo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{profissionalTipoEntity.id}</dd>
          <dt>
            <span id="descricao">Descricao</span>
          </dt>
          <dd>{profissionalTipoEntity.descricao}</dd>
          <dt>
            <span id="situacao">Situacao</span>
          </dt>
          <dd>{profissionalTipoEntity.situacao ? 'true' : 'false'}</dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {profissionalTipoEntity.updatedAt ? (
              <TextFormat value={profissionalTipoEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {profissionalTipoEntity.createdAt ? (
              <TextFormat value={profissionalTipoEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/profissional-tipo" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profissional-tipo/${profissionalTipoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfissionalTipoDetail;
