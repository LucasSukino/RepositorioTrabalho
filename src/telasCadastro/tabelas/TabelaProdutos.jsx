import React from "react";
import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props) {
  function excluirProduto(produto) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      props.setListaProdutos(
        props.listaProdutos.filter((itemLista) => itemLista.id !== produto.id)
      );
    }
  }

  function editarProduto(produto) {
    props.setProdutoParaEdicao(produto);
    props.setModoEdicao(true);
    props.exibirFormulario(true);
  }

  return (
    <Container>
      <Button type="button" onClick={() => props.exibirFormulario(true)}>Novo Produto</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {props.listaProdutos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>R$ {produto.preco}</td>
              <td>{produto.estoque}</td>
              <td>
                <Button variant="danger" onClick={() => excluirProduto(produto)}>
                  Excluir
                </Button>{" "}
                <Button onClick={() => editarProduto(produto)} variant="warning">
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
