import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

function isActive(match, location) {
  if (!match)
    return false;

  if (match.url === "/" && location.pathname !== "/")
    return false;
  
  return true;
}

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => <NavLink strict to={to} ref={ref} {...itemProps} isActive={isActive} activeClassName="Mui-selected" />),
    [to],
  );

  return (
    <li>
      <ListItem divider button component={renderLink} data-cy={props['data-cy']}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  'data-cy': PropTypes.string
};

export default ListItemLink;
