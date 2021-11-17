import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './profissional-tipo.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfissionalTipoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const profissionalTipoEntity = useAppSelector(state => state.profissionalTipo.entity);
  const loading = useAppSelector(state => state.profissionalTipo.loading);
  const updating = useAppSelector(state => state.profissionalTipo.updating);
  const updateSuccess = useAppSelector(state => state.profissionalTipo.updateSuccess);

  const handleClose = () => {
    props.history.push('/profissional-tipo' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.updatedAt = convertDateTimeToServer(values.updatedAt);
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...profissionalTipoEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          updatedAt: displayDefaultDateTime(),
          createdAt: displayDefaultDateTime(),
        }
      : {
          ...profissionalTipoEntity,
          updatedAt: convertDateTimeFromServer(profissionalTipoEntity.updatedAt),
          createdAt: convertDateTimeFromServer(profissionalTipoEntity.createdAt),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="frontendApp.profissionalTipo.home.createOrEditLabel" data-cy="ProfissionalTipoCreateUpdateHeading">
            Criar ou editar Tipo de Profissional
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="profissional-tipo-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Descrição"
                id="profissional-tipo-descricao"
                name="descricao"
                data-cy="descricao"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Situação" id="profissional-tipo-situacao" name="situacao" data-cy="situacao" check type="checkbox" />

              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/profissional-tipo" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Voltar</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Salvar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfissionalTipoUpdate;
