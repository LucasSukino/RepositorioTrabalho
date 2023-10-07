import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./formularios/FormCadProduto";
import TabelaProdutos from "./tabelas/TabelaProdutos";
import TelaMensagem from "./TelaMensagem";

export default function TelaCadastroProduto(props) {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [produtoParaEdicao, setProdutoParaEdicao] = useState({
    id: "",
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
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
          {exibirFormulario ? (
            <FormCadProduto
              exibirFormulario={setExibirFormulario}
              listaProdutos={listaProdutos}
              setListaProdutos={setListaProdutos}
              produtoParaEdicao={produtoParaEdicao}
              setProdutoParaEdicao={setProdutoParaEdicao}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              setMostrarMensagem={setMostrarMensagem}
              setMensagem={setMensagem}
              setTipoMensagem={setTipoMensagem}
            />
          ) : (
            <TabelaProdutos
              exibirFormulario={setExibirFormulario}
              listaProdutos={listaProdutos}
              setListaProdutos={setListaProdutos}
              produtoParaEdicao={produtoParaEdicao}
              setProdutoParaEdicao={setProdutoParaEdicao}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
            />
          )}
        </Pagina>
      </Container>
    );
  }
}
