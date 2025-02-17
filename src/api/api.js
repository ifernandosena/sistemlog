// src/api/api.js
import axios from 'axios';

// Criar uma instância do Axios com baseURL configurado
export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND, // A URL da API será configurada no arquivo .env
  headers: {
    'Content-Type': 'application/json', // Definindo o tipo de conteúdo como JSON
  },
});
