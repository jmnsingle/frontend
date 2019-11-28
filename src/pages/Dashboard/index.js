import React from 'react';
import { MdAdd } from 'react-icons/md';

import {
  Container,
  Content,
  TableHeader,
  ButtonEdit,
  ButtonDelete,
  Name,
  Email,
  Idade,
  TitleName,
  TitleEmail,
  TitleIdade,
  Action,
} from './styles';

export default function Dashboard() {
  return (
    <Container>
      <TableHeader>
        <strong>Gerenciando alunos</strong>
        <aside>
          <button>
            <MdAdd color="#fff" size={25} /> Cadastrar{' '}
          </button>
          <input type="text" placeholder="Buscar aluno" />
        </aside>
      </TableHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <TitleName>NOME</TitleName>
              <TitleEmail>EMAIL</TitleEmail>
              <TitleIdade>IDADE</TitleIdade>
              <Action>AÇÂO</Action>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
            <tr>
              <Name>Juliano Nogueira</Name>
              <Email>devjuliano@gmail.com</Email>
              <Idade>22</Idade>
              <td>
                <ButtonEdit>editar</ButtonEdit>
                <ButtonDelete>apagar</ButtonDelete>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
