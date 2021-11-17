import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './profissional.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfisionalDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const profisionalEntity = useAppSelector(state => state.profisional.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profisionalDetailsHeading">Profisional</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{profisionalEntity.id}</dd>
          <dt>
            <span id="nome">Nome</span>
          </dt>
          <dd>{profisionalEntity.nome}</dd>
          <dt>
            <span id="telefone">Telefone</span>
          </dt>
          <dd>{profisionalEntity.telefone}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{profisionalEntity.email}</dd>
          <dt>
            <span id="situacao">Situação</span>
          </dt>
          <dd>{profisionalEntity.situacao ? 'true' : 'false'}</dd>
          <dt>
            <span id="updatedAt">Atualizado em</span>
          </dt>
          <dd>
            {profisionalEntity.updatedAt ? <TextFormat value={profisionalEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdAt">Criado em</span>
          </dt>
          <dd>
            {profisionalEntity.createdAt ? <TextFormat value={profisionalEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Tipo de Profissional</dt>
          <dd>{profisionalEntity.profissionalTipo ? profisionalEntity.profissionalTipo.descricao : ''}</dd>
        </dl>
        <Button tag={Link} to="/profisional" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Voltar</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profisional/${profisionalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfisionalDetail;
