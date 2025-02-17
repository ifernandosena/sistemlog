import axios from "axios";

// Configuração da instância do axios
const api = axios.create({
  baseURL: "http://192.168.1.214:3333", // Endereço da sua API
  headers: {
    "Content-Type": "application/json", // Tipo de conteúdo
  },
});

export default api;
