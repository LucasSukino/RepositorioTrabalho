import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadCategorias from "./formularios/FormCadCategoria";
import TabelaCategorias from "./tabelas/TabelaCategorias";
import { Container } from "react-bootstrap";
import TelaMensagem from "./TelaMensagem";

export default function TelaCadastroCategorias(props){
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaParaEdicao, setCategoriaParaEdicao] = useState({
        nome:'',
        descricao:'',
        subcategoria:''
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem]= useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    if(mostrarMensagem){
    return(
        <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem}></TelaMensagem>
    )
    }
    return(
        <Container>
            <Pagina>
            {
                //dinâmica em que o usuário irá alternar entre o formulário e a visualização
                //dos registros já cadastrados
                exibirFormulario ? <FormCadCategorias exibirFormulario={setExibirFormulario}
                    listaCategorias={listaCategorias}
                    setListaCategorias={setListaCategorias}
                    categoriaParaEdicao={categoriaParaEdicao}
                    setCategoriaParaEdicao={setCategoriaParaEdicao}
                    modoEdicao={modoEdicao} setModoEdicao={setModoEdicao}
                    setMostrarMensagem={setMostrarMensagem}
                    setMensagem={setMensagem}
                    setTipoMensagem={setTipoMensagem}
                    />
                    :
                        <TabelaCategorias exibirFormulario={setExibirFormulario}
                        listaCategorias={listaCategorias}
                        setListaCategorias={setListaCategorias}
                        categoriaParaEdicao={categoriaParaEdicao}
                        setCategoriaParaEdicao={setCategoriaParaEdicao}
                        modoEdicao={modoEdicao} setModoEdicao={setModoEdicao}
                        setMostrarMensagem={setMostrarMensagem}
                        setMensagem={setMensagem}
                        setTipoMensagem={setTipoMensagem}/>
            }
            </Pagina>
        </Container>
    )
}