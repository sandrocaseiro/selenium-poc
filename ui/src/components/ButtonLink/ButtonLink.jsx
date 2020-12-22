import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function ButtonLink(props) {
  const { text, to, color, className, variant } = props;

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return <Button className={className} color={color} variant={variant} component={renderLink} data-cy={props['data-cy']} >{text}</Button>;
}

ButtonLink.defaultProps = {
  color: 'primary'
};

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  'data-cy': PropTypes.string
};

export default ButtonLink;
