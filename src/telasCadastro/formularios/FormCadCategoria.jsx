import React, { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadCategoria(props) {
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
            if (props.modoEdicao) {
                // Modo de edição - atualiza os dados da categoria
                const listaAtualizada = props.listaCategorias.map((itemCategoria) => {
                    if (itemCategoria.nome === categoria.nome) {
                        return categoria; // Atualiza a categoria com o mesmo nome
                    }
                    return itemCategoria;
                });
    
                props.setListaCategorias(listaAtualizada);
                props.setMensagem("Categoria editada com sucesso!");
            } else {
                // Adiciona a nova categoria à lista
                props.setListaCategorias([...props.listaCategorias, categoria]);
                props.setMensagem("Categoria cadastrada com sucesso!");
            }
            props.setTipoMensagem("success");
            props.setMostrarMensagem(true);
            setCategoria(estadoInicialCategoria);
            props.setModoEdicao(false);
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
            <Col md={6} offset={5} className="flex justify-content-end">
                    <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar":"Cadastrar"}</Button>
            </Col>
            <Col md={6} offset={5}>
                <Button type="button" variant={"secondary"} onClick={()=>{
                    props.exibirFormulario(false)
                    }}>Voltar</Button>
            </Col>
        </Row>
        </Form>
    </Container>
);
}
