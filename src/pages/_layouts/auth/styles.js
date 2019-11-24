import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #fc2b6e;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 320px;
  background: #fff;
  text-align: center;
  border-radius: 4px;

  padding: 20px;

  img {
    margin-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    p {
      font-weight: bold;
      text-align: left;
      margin: 0 0 5px;
      color: #423d3d;
    }

    input {
      height: 44px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      margin: 0 0 15px;

      &::placeholder {
        padding: 5px;
      }
    }

    button {
      height: 44px;
      border: none;
      border-radius: 4px;
      background: #fc2b6e;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.05, '#fc2b6e')};
      }
    }
  }
`;
