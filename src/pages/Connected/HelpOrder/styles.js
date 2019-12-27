import styled from 'styled-components';

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;

    p {
      margin-top: 10px;
    }

    textarea {
      margin-top: 10px;
      border-radius: 4px;
      padding: 10px;
    }
  }
`;

export const ContainerAnswer = styled.div`
  height: 230px;
  margin-top: 25px;

  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ActionModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
