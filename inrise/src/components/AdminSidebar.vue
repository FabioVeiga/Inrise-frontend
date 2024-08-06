<template>
  <div class="sidebar">
    <div class="header">
      Adminrise
    </div>
    <div class="categories">
      <!-- Produtos Category -->
      <div class="category">
        <div class="category-title">Produtos</div>
        <ul>
          <li><router-link to="/admin/meusProdutos" class="nav-button">Meus Produtos</router-link></li>
          <li><router-link to="/admin/cadastrarProdutos" class="nav-button">Cadastrar produtos</router-link></li>
          <li><router-link to="/admin/computadoresProntos" class="nav-button">Computadores prontos</router-link></li>
        </ul>
      </div>
      <!-- Softwares Category -->
      <div class="category">
        <div class="category-title">Softwares</div>
        <ul>
          <li><router-link to="/admin/cadastrarSoftwares" class="nav-button">Cadastrar softwares</router-link></li>
          <li><router-link to="/admin/gruposDeSoftware" class="nav-button">Grupos de software</router-link></li>
          <li><router-link to="/admin/cadastroDeCategorias" class="nav-button">Cadastro de categorias</router-link></li>
        </ul>
      </div>
      <!-- Pedidos Category -->
      <div class="category">
        <div class="category-title">Pedidos</div>
        <ul>
          <li><router-link to="/admin/usuarios" class="nav-button">Usuários</router-link></li>
          <li><router-link to="/admin/todosOsPedidos" class="nav-button">Todos os pedidos</router-link></li>
          <li><router-link to="/admin/analiseFinanceira" class="nav-button">Análise financeira</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #f4f4f4;
  padding-top: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.categories {
  flex: 1;
}

.category {
  margin-bottom: 20px;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  text-align: left;
  width: 100%;
  padding: 10px;
  display: block; 
  text-decoration: none; 
}

.nav-button:hover {
  background-color: #ddd;
}
</style>
