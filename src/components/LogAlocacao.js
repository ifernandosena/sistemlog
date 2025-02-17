import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./LogAlocacao.css"; // Arquivo de estilos personalizados

const LogAlocacao = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const PegarDados2 = async (di, df) => {
    const resultado = await axios.post("http://192.168.1.214:3333/lista_Logaloc", {
      inicio: di,
      fim: df,
    });
    return resultado;
  };

  const buscarDados = async () => {
    if (!dataInicio || !dataFim) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const response = await PegarDados2(dataInicio, dataFim);

      if (Array.isArray(response.data)) {
        setDados(response.data);
      } else {
        setErro("Dados retornados não estão no formato esperado.");
      }
    } catch (error) {
      setErro("Erro ao buscar os dados: " + (error.response?.data?.message || error.message));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Log de Alocação <span className="version">v1.0</span>
      </h1>

      <div className="row mb-4 filters">
        <div className="col-md-4">
          <label htmlFor="dataInicio" className="form-label">
            Data Início
          </label>
          <input
            type="date"
            id="dataInicio"
            className="form-control"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="dataFim" className="form-label">
            Data Fim
          </label>
          <input
            type="date"
            id="dataFim"
            className="form-control"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button
            className="btn btn-custom w-100"
            onClick={buscarDados}
            disabled={carregando}
          >
            <i className="fa fa-search"></i> {carregando ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Unidade</th>
              <th>Tipo</th>
              <th>Quem</th>
              <th>Quando</th>
              <th>Mensagem</th>
              <th>Data Original</th>
              <th>Nova Data</th>
            </tr>
          </thead>
          <tbody>
            {dados.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center no-data">
                  {erro || "Selecione um período e clique em buscar."}
                </td>
              </tr>
            ) : (
              dados.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.unidade}</td>
                  <td>{log.tipo}</td>
                  <td>{log.quem}</td>
                  <td>{log.quando}</td>
                  <td>{log.msg}</td>
                  <td>{log.original_data}</td>
                  <td>{log.new_data}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogAlocacao;
