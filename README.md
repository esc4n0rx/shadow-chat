
# ShadowChat

ShadowChat é uma aplicação web de chat privado e seguro que permite que os usuários criem salas de conversa criptografadas. As mensagens são criptografadas no cliente antes de serem enviadas, garantindo que somente os participantes com a chave correta possam lê-las.

## Funcionalidades

- **Criação de Salas Privadas**: Os usuários podem criar salas de chat privadas com um nome personalizado.
- **Criptografia de Mensagens**: As mensagens são criptografadas usando a Web Crypto API antes de serem enviadas.
- **Compartilhamento Seguro de Chaves**: A chave de criptografia é compartilhada entre os usuários através do fragmento da URL, que não é enviado ao servidor.
- **Envio de Mensagens em Tempo Real**: Utiliza WebSockets para comunicação em tempo real entre os clientes.
- **Mensagens Temporárias**: As mensagens são removidas do chat após 15 segundos, aumentando a privacidade.
- **Nomes de Usuário Aleatórios**: Cada usuário recebe um nome aleatório e divertido ao entrar na sala.
- **Envio de Emojis**: Suporte a emojis para tornar as conversas mais expressivas.
- **Envio com Tecla Enter**: Permite enviar mensagens pressionando a tecla Enter.
- **Botão de Sair**: Opção para sair da sala e retornar à tela inicial, encerrando a sessão.

## Tecnologias Utilizadas

- **Frontend**: Next.js com React, utilizando Tailwind CSS para estilização.
- **Backend**: FastAPI (Python) com suporte a WebSockets para comunicação em tempo real.
- **Criptografia**: Web Crypto API para criptografar e descriptografar mensagens no lado do cliente.
- **Hospedagem**:
  - **Frontend**: Vercel
  - **Backend**: Railway

## Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **Python** (versão 3.7 ou superior)
- **npm** ou **yarn**
- **pip** para gerenciamento de pacotes Python

### Passos

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/shadowchat.git
   cd shadowchat
   ```

2. **Configurar o Backend**

   Navegue até o diretório do backend:

   ```bash
   cd backend
   ```

   Crie um ambiente virtual e ative-o:

   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

   Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

   Execute o servidor FastAPI:

   ```bash
   uvicorn main:app --reload
   ```

3. **Configurar o Frontend**

   Navegue até o diretório do frontend:

   ```bash
   cd ../frontend
   ```

   Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

   Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acessar a Aplicação**

   Abra o navegador e acesse http://localhost:3000 para usar o ShadowChat localmente.

## Como Usar

### Página Inicial

Ao acessar a aplicação, você verá a tela inicial com o nome do projeto, um resumo e três opções: Iniciar, Github e Contato.

- **Iniciar**: Leva você para as opções de criar uma nova sala ou entrar em uma sala existente.
- **Github**: Abre o repositório do projeto no Github.
- **Contato**: Abre um formulário para entrar em contato.

### Criar Sala Privada

1. Clique em Criar Sala Privada.
2. Insira um nome para a sala e clique em Criar Sala.
3. Você será redirecionado para a sala de chat e um link será gerado para compartilhar com amigos.

### Entrar em Sala Privada

1. Acesse usando o link privado gerado ao criar uma sala.
   

### Enviando Mensagens

- Digite sua mensagem no campo de entrada.
- Pressione Enter ou clique em Enviar para enviar a mensagem.
- Use o ícone de emoji para adicionar emojis às suas mensagens.

### Sair da Sala

Clique no botão Sair no topo da sala para retornar à tela inicial.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests no repositório do Github.
EOL
