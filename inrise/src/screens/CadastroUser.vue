<template>
    <div class="register-page">
      <h1>Cadastro de Usuário</h1>
      <form @submit.prevent="registerUser">
        <!-- ID (hidden) -->
        <input type="hidden" v-model="user.id" />
  
        <!-- Nome -->
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
  
        <!-- Sobrenome -->
        <div class="form-group">
          <label for="lastname">Sobrenome:</label>
          <input type="text" id="lastname" v-model="user.lastname" required />
        </div>
  
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
  
        <!-- Número de Telefone -->
        <div class="form-group">
          <label for="phoneNumber">Número de Telefone:</label>
          <input type="tel" id="phoneNumber" v-model="user.phoneNumber" required />
        </div>
  
        <!-- Senha -->
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
  
        <!-- Botão de Cadastro -->
        <button type="submit">Confirmar Cadastro</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          id: 0,
          name: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          password: '',
        },
      };
    },
    methods: {
      registerUser() {
        // Aqui você pode fazer a requisição PUT para o backend
        console.log('Dados do usuário:', this.user);
  
        // Exemplo de requisição PUT usando fetch
        fetch('/User', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Usuário cadastrado com sucesso:', data);
          })
          .catch((error) => {
            console.error('Erro ao cadastrar usuário:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>