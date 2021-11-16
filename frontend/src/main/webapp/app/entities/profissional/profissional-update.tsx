import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalTipo } from 'app/shared/model/profissional-tipo.model';
import { getEntities as getProfissionalTipos } from 'app/entities/profissional-tipo/profissional-tipo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './profissional.reducer';
import { IProfisional } from 'app/shared/model/profisional.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProfisionalUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const profissionalTipos = useAppSelector(state => state.profissionalTipo.entities);
  const profisionalEntity = useAppSelector(state => state.profisional.entity);
  const loading = useAppSelector(state => state.profisional.loading);
  const updating = useAppSelector(state => state.profisional.updating);
  const updateSuccess = useAppSelector(state => state.profisional.updateSuccess);

  const handleClose = () => {
    props.history.push('/profisional' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProfissionalTipos({}));
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
      ...profisionalEntity,
      ...values,
      profissionalTipo: profissionalTipos.find(it => it.id.toString() === values.profissionalTipoId.toString()),
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
          ...profisionalEntity,
          updatedAt: convertDateTimeFromServer(profisionalEntity.updatedAt),
          createdAt: convertDateTimeFromServer(profisionalEntity.createdAt),
          profissionalTipoId: profisionalEntity?.profissionalTipo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="frontendApp.profisional.home.createOrEditLabel" data-cy="ProfisionalCreateUpdateHeading">
            Create or edit a Profisional
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="profisional-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Nome"
                id="profisional-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Telefone"
                id="profisional-telefone"
                name="telefone"
                data-cy="telefone"
                type="text"
                validate={{
                  pattern: {
                    value: /(^(\(\d{2}\))\s(\d{4,5}(-)?\d{4})$)/,
                    message: "This field should follow pattern for '(^(\\(\\d{2}\\))\\s(\\d{4,5}(\\-)?\\d{4})$)'.",
                  },
                }}
              />
              <ValidatedField
                label="Email"
                id="profisional-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  pattern: {
                    value: /(^[a-z0-9.]+@([a-z0-9]+)(\.[a-z0-9]+)*$)/,
                    message: "This field should follow pattern for '(^[a-z0-9.]+@([a-z0-9]+)(\\.[a-z0-9]+)*$)'.",
                  },
                }}
              />
              <ValidatedField label="Situacao" id="profisional-situacao" name="situacao" data-cy="situacao" check type="checkbox" />
              <ValidatedField
                id="profisional-profissionalTipo"
                name="profissionalTipoId"
                data-cy="profissionalTipo"
                label="Profissional Tipo"
                type="select"
                required
              >
                <option value="" key="0" />
                {profissionalTipos
                  ? profissionalTipos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.descricao}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/profisional" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfisionalUpdate;
