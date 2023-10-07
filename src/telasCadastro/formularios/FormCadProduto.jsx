import React, { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadProduto(props) {
  // Definição do estado inicial do produto
  const produtoVazio = {
    id: "",
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
  };

  // Inicialização do estado do produto com os valores iniciais ou valores para edição
  const estadoInicialProduto = props.produtoParaEdicao;
  const [produto, setProduto] = useState(estadoInicialProduto);

  // Estado para controle da validação do formulário
  const [formValidado, setFormValidado] = useState(false);

  // Função para lidar com mudanças nos campos do formulário
  function manipularMudancas(e) {
    const componente = e.currentTarget;
    setProduto({ ...produto, [componente.name]: componente.value });
  }

  // Função para lidar com a submissão do formulário
  function manipularSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Verifica se o produto com o mesmo ID já existe na lista
      const produtoExistente = props.listaProdutos.find(
        (itemProduto) => itemProduto.id === produto.id
      );
  
      if (produtoExistente) {
        // Produto com o mesmo ID já existe, exibe uma mensagem de erro
        props.setMensagem("Produto com o mesmo ID já existe!");
        props.setTipoMensagem("danger");
        props.setMostrarMensagem(true);
      } else {
        // Se o formulário for válido e o ID não estiver duplicado, realiza a ação de inclusão ou edição
        if (!props.modoEdicao) {
          props.setListaProdutos([...props.listaProdutos, produto]);
          props.setMensagem("Produto incluído com sucesso");
          props.setTipoMensagem("success");
          props.setMostrarMensagem(true);
        } else {
          // Edita os dados do produto (filtrando e adicionando)
          props.setListaProdutos([
            ...props.listaProdutos.filter(
              (itemProduto) => itemProduto.id !== produto.id
            ),
            produto,
          ]);
          props.setModoEdicao(false);
          props.setProdutoParaEdicao(produtoVazio);
        }
        setProduto(produtoVazio); // Limpa os campos do formulário ou sair da tela de formulário
        setFormValidado(false);
      }
    } else {
      setFormValidado(true);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <Container>
      <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
        {/* Campo de ID */}
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="ID do Produto:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="ID do produto"
                  id="id"
                  name="id"
                  value={produto.id}
                  onChange={manipularMudancas}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Informe o ID do produto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Campo de Nome */}
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="Nome do Produto:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nome do produto"
                  id="nome"
                  name="nome"
                  value={produto.nome}
                  onChange={manipularMudancas}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Informe o nome do produto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Campo de Descrição */}
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="Descrição:" className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Descrição do produto"
                  id="descricao"
                  name="descricao"
                  value={produto.descricao}
                  onChange={manipularMudancas}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Informe a descrição do produto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Campo de Preço */}
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="Preço:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Preço do produto"
                  id="preco"
                  name="preco"
                  value={produto.preco}
                  onChange={manipularMudancas}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Informe o preço do produto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Campo de Estoque */}
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="Estoque:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Estoque do produto"
                  id="estoque"
                  name="estoque"
                  value={produto.estoque}
                  onChange={manipularMudancas}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Informe o estoque do produto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Botões de submit e voltar */}
        <Row>
          <Col md={6} offset={5} className="d-flex justify-content-end">
            <Button type="submit" variant={"primary"}>
              {props.modoEdicao ? "Alterar" : "Cadastrar"}
            </Button>
          </Col>
          <Col md={6} offset={5}>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                props.exibirFormulario(false);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
