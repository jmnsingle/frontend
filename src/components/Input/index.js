import styled, { css } from 'styled-components';
import { Input } from '@rocketseat/unform';

const sizes = {
  short: css`
    width: 255px;
  `,
  small: css`
    width: 340px;
  `,
  midle: css`
    width: 600px;
  `,
  large: css`
    width: 1040px;
  `,
};

const InputField = styled(Input)`
  border-radius: 4px;
  transition: border-color 0.25s ease;
  border: 1px solid #ddd;
  height: 38px;
  margin: 10px 10px 10px 0;
  padding: 10px;
  background: ${props => (props.readOnly ? '#ededed' : null)};

  ${props => sizes[props.size]};
`;

export default InputField;
