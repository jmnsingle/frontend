import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 100px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  background: #fff;
  width: 100%;
  border-radius: 4px;

  table {
    border-spacing: 0;
    width: 100%;
    padding: 4px;
  }

  tr {
    height: 32px;
    border-bottom: 1px solid #000;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  strong {
    font-size: 24px;
  }

  aside {
    display: flex;

    button {
      display: flex;
      align-items: center;
      border: none;
      background: #fc2b6e;
      color: #fff;
      border-radius: 4px;
      margin: 10px;
      height: 30px;
      width: 100px;
    }

    input {
      height: 32px;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.8);
      padding: 4px;

      display: flex;
      align-self: center;
    }
  }
`;

export const TitleName = styled.td`
  text-align: left;
  font-size: 14px;
`;
export const TitleEmail = styled.td`
  text-align: left;
  font-size: 14;
`;
export const TitleIdade = styled.td`
  text-align: center;
  font-size: 14;
`;
export const Action = styled.td`
  text-align: center;
  font-size: 14;
`;

export const ButtonEdit = styled.button`
  border: none;
  padding: 2px;
  background: none;
  transition: 0.2s;
  color: blue;
`;

export const ButtonDelete = styled.button`
  border: none;
  padding: 2px;
  background: none;
  transition: 0.2s;
  color: red;
`;

export const Name = styled.td`
  text-align: left;
  font-size: 14;
`;

export const Email = styled.td`
  text-align: left;
  font-size: 14;
`;

export const Idade = styled.td`
  text-align: center;
  font-size: 14;
`;
