import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import loading from '~/assets/giphy.gif';

export default function Loading({ height, top, left }) {
  return (
    <Container height={height} top={top} left={left}>
      <img src={loading} alt="Loading" />
    </Container>
  );
}

Loading.propTypes = {
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
};

Loading.defaultProps = {
  height: 400,
  top: 155,
  left: 136,
};
