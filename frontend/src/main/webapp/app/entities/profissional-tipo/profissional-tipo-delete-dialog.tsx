import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './profissional-tipo.reducer';

export const ProfissionalTipoDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const profissionalTipoEntity = useAppSelector(state => state.profissionalTipo.entity);
  const updateSuccess = useAppSelector(state => state.profissionalTipo.updateSuccess);

  const handleClose = () => {
    props.history.push('/profissional-tipo' + props.location.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(profissionalTipoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="profissionalTipoDeleteDialogHeading">
        Confirmar Remoção
      </ModalHeader>
      <ModalBody id="frontendApp.profissionalTipo.delete.question">Tem certeza que deseja remover este Tipo de Profissional?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancelar
        </Button>
        <Button id="jhi-confirm-delete-profissionalTipo" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Apagar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProfissionalTipoDeleteDialog;
