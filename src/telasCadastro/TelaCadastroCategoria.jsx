import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadCategoriaProduto(props) {
    const categoriaVazia = {
        nome: "",
        descricao: "",
        // Outros campos relacionados à categoria de produto
    };

    const estadoInicialCategoria = props.categoriaParaEdicao;
    const [categoria, setCategoria] = useState(estadoInicialCategoria);
    const [formValidado, setFormValidado] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setCategoria({ ...categoria, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            // Todos os campos preenchidos
            // Enviar os dados da categoria para o backend
            if (!props.modoEdicao) {
                props.setListaCategorias([...props.listaCategorias, categoria]);
                props.setMensagem("Categoria incluída com sucesso");
                props.setTipoMensagem("success");
                props.setMostrarMensagem(true);
            } else {
                // Alterar os dados da categoria (filtra e adiciona)
                props.setListaCategorias([
                    ...props.listaCategorias.filter(
                        (itemCategoria) => itemCategoria.id !== categoria.id
                    ),
                    categoria,
                ]);
                props.setModoEdicao(false);
                props.setCategoriaParaEdicao(categoriaVazia);
            }
            setCategoria(categoriaVazia);
            setFormValidado(false);
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
                            <FloatingLabel
                                label="Nome da Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome da categoria"
                                    id="nome"
                                    name="nome"
                                    value={categoria.nome}
                                    onChange={manipularMudancas}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                Informe o nome da categoria!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Descrição:"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Informe a descrição da categoria"
                                    id="descricao"
                                    name="descricao"
                                    value={categoria.descricao}
                                    onChange={manipularMudancas}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                Informe a descrição da categoria!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                {/* Adicione mais campos para a categoria de produto conforme necessário */}
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={props.modoEdicao ? "primary" : "success"}>
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
