<template>
  <div class="footer">
    <div class="flex-container">
      <div class="flex-item main-column">
        <p class = "topText" >Endereço</p>
        <p class = "bottomText" >Rua de Sei lá da onde, nº 12983</p>
      </div>
      <div class="flex-item">
        <p class = "topText" >Redes Sociais</p>
        <div class = "iconHolder" >
          <div class = "square-grey"></div>
          <div class = "square-grey"></div>
          <div class = "square-grey"></div>
          <div class = "square-grey"></div>
        </div>

      </div>
      <div class="flex-item">
        <p class = "topText" >Fale Conosco</p>
        <p class = "bottomText" >sac@inrise.com</p>
        <p class = "bottomText" >+351 962 597 198</p>
      </div>
      <div class="flex-item">
        <p class = "topText" >Pague Usando</p>     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  width: 100vw;
  height: 87px;
  background: linear-gradient(to bottom, #54C0ED, #E431FE);
  padding: 0px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-container {
  width: 100%;
  height:100%;
  display: flex;
}

.topText{
  padding:10px;
  font-size: 16px;
  font-weight: 900;
}

.icon-holder{
 display:flex;
 flex-direction: row;
}

.flex-item {
  flex-grow: 1;
  text-align: center;
  color: #FFF;
}

p{
  margin:0px;
}

.main-column {
  flex-basis: 70%; 
}

.square-grey{
  flex-grow: 1;
  width: 30px;
  height:30px;
  
}
</style>
