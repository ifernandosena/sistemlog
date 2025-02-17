// src/api.js

import axios from "axios";

// Criando uma instância personalizada do axios com baseURL configurada
export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND, // URL do backend pega do arquivo .env
  headers: {
    "Content-Type": "application/json",
  },
  // Caso haja algum problema com o SSL no backend, você pode configurar isso aqui:
  // strictSSL: false,
});
