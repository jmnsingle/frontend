import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';

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
  > div {
    margin: 10px 10px 10px 0;
    width: ${props => (props.large ? '1020px' : '240px')};
  }
`;

export const Header = styled.div`
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;

  strong {
    font-size: 24px;
  }

  aside {
    display: flex;
  }
`;

export const Date = styled(DatePicker).attrs({
  locale: pt,
})`
  border-radius: 4px;
  border: 1px solid #ddd;
  height: 38px;
  width: 240px;
  margin-right: 36px;
  padding-left: 10px;

  div > input {
  }
`;
