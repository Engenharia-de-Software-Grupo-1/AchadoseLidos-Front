# **Achados e Lidos** 📚  

📌 *Catálogo digital de sebos de Campina Grande*  

## 🚀 **Como rodar o projeto?**  

### 🛠 **Pré-requisitos**  

Certifique-se de ter as seguintes dependências instaladas:  

#### **Node.js**  

Versão recomendada: **18 ou superior** (*configurado com v18.20.6*)  

Se estiver usando **nvm** (*Node Version Manager*), execute:  

```sh
nvm install 18
nvm use 18
```

Para verificar a versão instalada:  

```sh
node -v
```

#### **Yarn**  

Versão utilizada na configuração: **v1.22.19**  

Instale o Yarn globalmente:  

```sh
npm install --global yarn
```

Confirme a instalação:  

```sh
yarn --version
```

---

### 📂 **Instalação do projeto**  

Após instalar as dependências, siga os passos abaixo:  

**Baixar as dependências do projeto**  

```sh
yarn
```

**Rodar a aplicação**  

```sh
yarn dev
```

A aplicação estará disponível no navegador.  

**Rodar o Cypress para testes**  
Para abrir a interface gráfica de testes do **Cypress**, use:  

```sh
yarn cypress open
```

---

## 🚀 **Comandos de lint do repositório**  

Para rodar o analisador estático localmente, basta rodar:

```sh
yarn eslint . --config eslint.config.mjs
```

Para aplicar as correções de lint:

```sh
yarn eslint . --fix
```

Para aplicar lint do prettier

```
yarn prettier --write .
```

---

### 🛠 **Extensões Recomendadas (VS Code)**  

Para um desenvolvimento mais produtivo no **VS Code**, recomendamos instalar as seguintes extensões:  

- **ESLint** → Ajuda a manter um código padronizado.  
- **Prettier - Code formatter** → Formata o código automaticamente.  
- **Cypress Support** → Melhor integração com Cypress.  
- **GitLens** → Melhora a experiência com Git dentro do VS Code.  
- **Bracket Pair Color DLW** → Destaca pares de colchetes com cores diferentes, facilitando a leitura do código.  

---

### 🎯 **Pronto!**  
