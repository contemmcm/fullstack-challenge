import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';

const openAPIItem = (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const AdminMenu = ({ showOpenAPI, showDatabase }) => (
  <NavDropdown icon="users-cog" name="Administração" id="admin-menu" data-cy="adminMenu">
    {openAPIItem}
  </NavDropdown>
);

export default AdminMenu;
