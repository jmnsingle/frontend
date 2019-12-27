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
  width: 100%;
  height: 400px;
  border-radius: 4px;
  margin-top: 25px;

  display: flex;

  table {
    border-spacing: 0;
    width: 100%;
    margin: 20px;

    tbody {
      height: 100px;

      tr:hover {
        background: #f2f2f2;
      }
    }
  }
`;

export const TableHeader = styled.div`
  width: 100%;
  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 24px;
  }

  aside {
    display: flex;

    input {
      height: 32px;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.8);
      padding: 4px;
      margin-left: 10px;

      display: flex;
      align-self: center;
    }
  }
`;
