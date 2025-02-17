# **Configuração Inicial do Projeto**

*Comandos utilizados para subir o projeto na US2*

Crie o `package.json`:

```sh
yarn init -y
```

---

Instale o Vite e suas dependências:

```sh
yarn add -D vite
yarn add react react-dom
yarn add -D @vitejs/plugin-react vite-tsconfig-paths
```

Crie um arquivo `vite.config.ts` na raiz do projeto:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```

Adicione os scripts no `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

Instale as dependências:

```sh
yarn add react-router-dom@6.16.0
yarn add -D typescript @types/react @types/react-dom
```

Crie um arquivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "Node"
  }
}
```

---

Instale as dependências:

```sh
yarn add -D eslint eslint-config-airbnb eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier
```

Crie o arquivo `.eslintrc.json`:

```json
{
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off"
  }
}
```

---

Instale as dependências:

```sh
yarn add --dev prettier
```

Crie o arquivo `.prettierrc`:

```json
{
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 120,
  "trailingComma": "es5",
  "prettier.tabWidth": 2,
  "prettier.singleQuote": true,
  "prettier.printWidth": 120,
  "prettier.trailingComma": "es5"
}

```

---

Instale o **PrimeReact** e **PrimeIcons**:

```sh
yarn add primereact primeicons
```

No `main.tsx`, importe o tema do PrimeReact:

```ts
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

---

Instale o **Cypress**:

```sh
yarn add -D cypress
```

Para abrir o Cypress pela primeira vez:

```sh
yarn cypress open
```

---

Crie as pastas e arquivos necessários:

```sh
mkdir -p src/pages src/components public
touch src/main.tsx src/App.tsx index.html
```

**`index.html`**:

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Projeto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**`src/main.tsx`**:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**`src/App.tsx`**:

```tsx
import { Menubar } from "primereact/menubar";

const App = () => {
  const items = [{ label: "Home" }, { label: "Sobre" }, { label: "Contato" }];

  return (
    <div>
      <Menubar model={items} />
      <h1>Bem-vindo ao projeto!</h1>
    </div>
  );
};

export default App;
```

---

Para iniciar o projeto, use:

```sh
yarn dev
```

---
