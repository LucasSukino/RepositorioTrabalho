import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadCategorias(props) {

    const categoriaVazio = {
        nome:'',
        descricao:'',
        subcategoria:''
    }

    const estadoInicialCategoria = props.categoriaParaEdicao;
    const [categoria, setCategoria] = useState(estadoInicialCategoria);
    const [formValidado, setFormValidado] = useState(false);

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setCategoria({ ...categoria, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            // Verifique se a categoria já existe
            const categoriaExistente = props.listaCategorias.find(
            (itemCategoria) => itemCategoria.nome === categoria.nome
            );
            if (!categoriaExistente || props.modoEdicao) {
            // Verificar se a subcategoria já existe dentro da categoria atual
            const subcategoriaExistente = props.listaCategorias.some(
                (itemCategoria) =>
                itemCategoria.nome === categoria.nome &&
                itemCategoria.subcategoria === categoria.subcategoria
            );
            if (!subcategoriaExistente) {
                if (props.modoEdicao) {
                props.setListaCategorias((categorias) =>
                    categorias.map((item) =>
                    item.nome === categoria.nome ? categoria : item
                    )
                );
                props.setMensagem("Categoria editada com sucesso!");
                } else {
                props.setListaCategorias([...props.listaCategorias, categoria]);
                props.setMensagem("Categoria cadastrada com sucesso!");
                }
                props.setTipoMensagem("success");
                props.setMostrarMensagem(true);
                setCategoria(estadoInicialCategoria);
                props.setModoEdicao(false);
            } else {
                // Exibir mensagem de erro se a subcategoria já existe
                props.setMensagem("Subcategoria já existe nesta categoria.");
                props.setTipoMensagem("danger");
                props.setMostrarMensagem(true);
            }
            } else {
            // Exibir mensagem de erro se a categoria já existe
            props.setMensagem("Categoria já existe.");
            props.setTipoMensagem("danger");
            props.setMostrarMensagem(true);
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
        <Row>
            <Col>
            <Form.Group>
                <FloatingLabel label="Nome da Categoria" className="mb-3">
                <Form.Control
                    type="text"
                    name="nome"
                    value={categoria.nome}
                    onChange={manipularMudancas}
                    required
                />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                Informe o nome!
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <FloatingLabel label="Descrição" className="mb-3">
                <Form.Control
                    type="text"
                    name="descricao"
                    value={categoria.descricao}
                    onChange={manipularMudancas}
                />
                </FloatingLabel>
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form.Group>
                <FloatingLabel label="Subcategoria" className="mb-3">
                <Form.Control
                    type="text"
                    name="subcategoria"
                    value={categoria.subcategoria}
                    onChange={manipularMudancas}
                />
                </FloatingLabel>
            </Form.Group>
            </Col>
        </Row>
        <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar":"Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                        }>Voltar</Button>
                    </Col>
                </Row>
        </Form>
    </Container>
);
}