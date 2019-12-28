import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;
  position: absolute;
  width: 1080px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background: rgba(255, 255, 255, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    z-index: 1;
  }
`;
