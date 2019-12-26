import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      border-right: 1px solid #ddd;
    }

    a {
      font-weight: bold;
      font-size: 18px;
      margin-right: 10px;
      color: ${props => (props.active ? '#000' : '#878787')};
      transition: 0.3s;
    }
    a:hover {
      color: #000;
    }

    .selected {
      color: #000;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button {
      border: none;
      background: none;
      color: #f55142;
      font-size: 12px;
      margin-top: 5px;
    }
  }
`;
