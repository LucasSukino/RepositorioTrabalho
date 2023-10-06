import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadFornecedor from "./formularios/FormCadFornecedor";
import TabelaFornecedores from "./tabelas/TabelaFornecedores";
import TelaMensagem from "./TelaMensagem";

export default function TelaCadastroFornecedor(props) {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [fornecedorParaEdicao, setFornecedorParaEdicao] = useState({
    cnpj: "",
    razaoSocial: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "SP",
    cep: "",
  });
  const [modoEdicao, setModoEdicao] = useState(false);

  if (mostrarMensagem) {
    return (
      <TelaMensagem
        mensagem={mensagem}
        tipo={tipoMensagem}
        setMostrarMensagem={setMostrarMensagem}
      />
    );
  } else {
    return (
      <Container>
        <Pagina>
          {
            //dinâmica em que o usuário irá alternar entre o formulário de cadastro
            //e a visualização dos registros já cadastrados.
            exibirFormulario ? (
              <FormCadFornecedor
                exibirFormulario={setExibirFormulario}
                listaFornecedores={listaFornecedores}
                setListaFornecedores={setListaFornecedores}
                fornecedorParaEdicao={fornecedorParaEdicao}
                setFornecedorParaEdicao={setFornecedorParaEdicao}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                setMostrarMensagem={setMostrarMensagem}
                setMensagem={setMensagem}
                setTipoMensagem={setTipoMensagem}
              />
            ) : (
              <TabelaFornecedores
                exibirFormulario={setExibirFormulario}
                listaFornecedores={listaFornecedores}
                setListaFornecedores={setListaFornecedores}
                fornecedorParaEdicao={fornecedorParaEdicao}
                setFornecedorParaEdicao={setFornecedorParaEdicao}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
              />
            )
          }
        </Pagina>
      </Container>
    );
  } //if o que retornar
}
