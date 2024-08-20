<template>
    <div class="login-page">
      <h1>Login de Admin</h1>
      <form @submit.prevent="loginAdmin">
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="admin.email" required />
        </div>
  
        <!-- Senha -->
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="admin.password" required />
        </div>
  
        <!-- Botão de Login -->
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        admin: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      loginAdmin() {
        // Aqui você pode fazer a requisição POST para o backend
        console.log('Dados de login:', this.admin);
  
        // Exemplo de requisição POST usando fetch
        fetch('/Admin/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.admin),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Login realizado com sucesso:', data);
          })
          .catch((error) => {
            console.error('Erro ao realizar login:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
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
  