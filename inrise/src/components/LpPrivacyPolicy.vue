<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-body">
          <h1 class="modal-title">Política de Privacidade para a Landing Page de Pré-Lançamento da InRise</h1>
          
          <h2 class="modal-subtitle">1. Considerações Importantes</h2>
          <p>
            A InRise sugere que leia atentamente esta Política de Privacidade, que
            explica como os seus dados pessoais serão utilizados ao inscrever-se
            na nossa landing page de pré-lançamento. A presente Política pode ser
            atualizada periodicamente; recomendamos que consulte regularmente
            esta página para estar informado sobre quaisquer alterações.
          </p>
  
          <h2 class="modal-subtitle">2. Quem Somos</h2>
          <p>
            A InRise Computadores LDA é uma sociedade comercial por quotas, com
            sede na Rua Sacadura Cabral, 117, 1495-704, Oeiras, Lisboa, registada
            na Conservatória do Registo Comercial de Aveiro, com o número de matrícula e de pessoa colectiva 518165043, 
            e um capital social de 1.000,00 Euros. Referimo-nos como "InRise" nesta Política de Privacidade.
          </p>
  
          <h2 class="modal-subtitle">3. Dados Pessoais Recolhidos</h2>
          <p>Para a inscrição no pré-lançamento da InRise, recolhemos apenas os seguintes dados:</p>
          <ul>
            <li>Nome</li>
            <li>Endereço de e-mail</li>
          </ul>
  
          <h2 class="modal-subtitle">4. Finalidade da Recolha de Dados</h2>
          <p>Os dados fornecidos serão utilizados exclusivamente para:</p>
          <ul>
            <li>Enviar informações sobre o pré-lançamento da InRise e outros updates relacionados.</li>
            <li>Enviar comunicações promocionais ou informativas sobre produtos, serviços, ofertas ou eventos futuros da InRise.</li>
            <li>Melhorar a experiência dos nossos potenciais clientes, com base no feedback recebido através das inscrições.</li>
          </ul>
  
          <h2 class="modal-subtitle">5. Consentimento</h2>
          <p>
            Ao inscrever-se na landing page, declara o seu consentimento livre, informado e explícito para que a InRise
            utilize os seus dados pessoais para os propósitos descritos acima. Pode retirar o seu consentimento a qualquer momento,
            conforme indicado na Secção 8 desta Política.
          </p>
  
          <h2 class="modal-subtitle">6. Armazenamento e Proteção dos Dados</h2>
          <p>
            Os teus dados pessoais são armazenados em servidores seguros, protegidos contra acessos não autorizados, perda ou uso indevido.
            Implementamos medidas técnicas e organizativas rigorosas para garantir a segurança das informações.
          </p>
  
          <h2 class="modal-subtitle">7. Partilha de Dados com Terceiros</h2>
          <p>
            A InRise não partilha os teus dados pessoais com terceiros, salvo em situações necessárias para cumprir obrigações legais
            ou em caso de contratação de serviços de envio de e-mails (como plataformas de automação de marketing), assegurando que
            estes terceiros seguem padrões elevados de segurança e confidencialidade.
          </p>
  
          <h2 class="modal-subtitle">8. Direitos dos Inscritos</h2>
          <p>
            Tem os seguintes direitos em relação aos seus dados pessoais:
          </p>
          <ul>
            <li><strong>Acesso:</strong> Solicitar informações sobre os dados pessoais que mantemos sobre si.</li>
            <li><strong>Rectificação:</strong> Corrigir ou actualizar os seus dados pessoais.</li>
            <li><strong>Apagamento:</strong> Solicitar que excluamos os seus dados pessoais.</li>
            <li><strong>Oposição:</strong> Solicitar a interrupção do envio de comunicações promocionais.</li>
            <li><strong>Portabilidade:</strong> Solicitar que transfiramos os seus dados para outro prestador de serviço.</li>
          </ul>
          <p>Para exercer qualquer um destes direitos, entre em contacto connosco através do e-mail: comercial@inrise.pt.</p>
  
          <h2 class="modal-subtitle">9. Período de Conservação dos Dados</h2>
          <p>
            Os dados pessoais serão mantidos pela InRise até que:
          </p>
          <ul>
            <li>Solicite a exclusão dos seus dados.</li>
          </ul>
  
          <h2 class="modal-subtitle">10. Alterações nesta Política</h2>
          <p>
            A InRise reserva-se o direito de actualizar esta Política de Privacidade sempre que necessário.
            Alterações significativas serão informadas por e-mail aos inscritos na landing page.
          </p>
  
          <h2 class="modal-subtitle">11. Contacto</h2>
          <p>
            Se tiver dúvidas ou preocupações relacionadas com a privacidade dos seus dados, entre em contacto através do e-mail: 
            <a href="mailto:comercial@inrise.pt">comercial@inrise.pt</a>.
          </p>
  
          <p>Obrigado por confiar na InRise!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LpPrivacyPolicy",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    watch: {
      isVisible(newValue) {
        if (newValue) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    margin: 0%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    font-family: Arial, sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .modal-subtitle {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  ul {
    padding-left: 20px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  
  ul li {
    margin-bottom: 5px;
  }
  
  .no-scroll {
    overflow: hidden;
    height: 100vh;
  }
  </style>
  