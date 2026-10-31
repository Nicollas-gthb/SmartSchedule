## Como baixar e executar o projeto

O SmartSchedule é composto por três módulos:

- **Backend:** Node.js + Express
- **Web:** React + Vite + TypeScript
- **Mobile:** React Native + Expo + TypeScript

Atualmente, apenas o módulo **Mobile** está disponível para execução e testes. Os demais módulos estão em desenvolvimento.

### 1. Clonar o repositório

```bash
git clone https://github.com/Nicollas-gthb/SmartSchedule.git
```

### 2. Acessar a pasta do Mobile

```bash
cd SmartSchedule/mobile
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o projeto

```bash
npx expo start --tunnel
```

A flag `--tunnel` permite disponibilizar uma conexão por túnel, facilitando o acesso ao projeto pelo celular, mesmo quando a conexão local direta não está disponível.

### 5. Acessar pelo celular

1. Instale o aplicativo **Expo Go** no seu celular.
2. Aguarde o Expo iniciar e gerar o QR Code e o link de acesso.
3. Abra o Expo Go e escaneie o QR Code ou utilize o link disponibilizado.
4. Aguarde o carregamento da aplicação.

Pronto! O SmartSchedule estará disponível para testes no seu dispositivo móvel.