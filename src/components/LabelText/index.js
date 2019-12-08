import styled, { css } from 'styled-components';

const alignTexts = {
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
    padding-right: 25px;
  `,
};

const Action = styled.td`
  display: flex;
  justify-content: flex-end;
`;

const LabelText = styled.th`
  font-weight: bold;
  color: ${props => (props.title ? '#242424' : '#999')};
  font-size: ${props => (props.title ? '18px' : '16px')};

  ${props => alignTexts[props.alignText]};
`;

export { LabelText, Action };
