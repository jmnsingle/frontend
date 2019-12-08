import styled from 'styled-components';

export const Container = styled.div`
  margin: 0px auto;
  max-width: 1080px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;
  padding: 20px;
  form {
    display: flex;
  }
  label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  span {
    color: #fc2b6e;
    margin: 0 0 15px 5px;
    font-weight: bold;
  }
`;

export const Hr = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Contain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  strong {
    font-size: 24px;
  }

  aside {
    display: flex;
  }
`;
