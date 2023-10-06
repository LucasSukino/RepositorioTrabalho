import { Button, Container, Table } from "react-bootstrap";

export default function TabelaCategoriasProduto(props) {
    function excluirCategoria(categoria) {
        if (window.confirm('Deseja realmente excluir essa categoria?')) {
            props.setListaCategorias(
                props.listaCategorias.filter((itemLista) => itemLista.id !== categoria.id)
            );
        }
    }

    function editarCategoria(categoria) {
        props.setCategoriaParaEdicao(categoria);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }

    return (
        <Container>
            <Button type="button" onClick={() => { props.exibirFormulario(true); }}>Nova Categoria</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        {/* Adicione mais colunas conforme necessário */}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaCategorias.map((categoria) => {
                            return (
                                <tr key={categoria.id}>
                                    <td>{categoria.id}</td>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    {/* Renderize outras colunas aqui */}
                                    <td>
                                        <Button variant="danger" onClick={() => { excluirCategoria(categoria); }}>
                                            Excluir
                                        </Button>
                                        {' '}
                                        <Button variant="warning" onClick={() => { editarCategoria(categoria); }}>
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}
