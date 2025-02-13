Essa especificação é uma adaptação da especificação [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)

### Benefícios
 - Histórico de commits
 - Manutenabilidade

### Histórico de commits

Um histórico de commits mais estruturado facilita a exploração da linha do tempo de um projeto e documenta melhor o seu desenvolvimento. Dessa forma, fica mais claro o caminho pelo qual o software está seguindo, o entendimento de sua evolução ao longo do tempo e as razões que motivaram determinada alteração no código fonte.

### Manutenabilidade

Commits padronizados ajudam muito a entender as razões por trás de uma alteração de um trecho de código na hora de dar manutenção no software.

> 💡 Um processo de versionamento mais estruturado influencia positivamente na qualidade do produto final, facilita a vida dos desenvolvedores e documenta, de forma mais assertiva, o desenvolvimento do software.
> 

---

## Commits

> **Estrutura**
> 
> 
> `{TYPE}: {DESCRIPTION}`
> 

---

### TYPE

O TYPE do commit representa o tipo de alteração que está sendo feita no commit.

Os tipos de commit mais comuns especificados pelo Conventional Commits são: **feat, fix, chore, refactor, docs, style, build, ci, perf** e **test**.

Antes de commitar, veja em qual tipo de commit as suas alterações melhor se encaixam com ajuda da documentação abaixo:

> 💡 Caso esteja difícil de identificar o tipo do seu commit, talvez você esteja commitando muitas alterações de uma vez só. Verifique se o seu commit pode ser subdividido em vários outros commits que sejam *atômicos*, pois assim será muito mais fácil de conseguir classificar o tipo do seu commit.
> 

### Principais tipos

> **feat**
> 
> 
> Adição de uma nova funcionalidade ao código.
> 
> `feat: implementa fluxo de login`
> 
> `feat: adiciona crud de produto`
> 

> **fix**
> 
> 
> Correção de bugs que **já estão em produção**.
> 
> `fix: corrige validacao no formulario de sebos`
> 
> `fix: corrige data sendo salva no banco de dados`
> 

> **chore**
> 
> 
> Tarefas de manutenção, pequenos ajustes.
> 
> `chore: desabilita botao de salvar enquanto o form esta incompleto`
> 
> `chore: corrige endpoint do controller`
> 

> **refactor**
> 
> 
> Refatorações de código que não adicionam novas funcionalidades nem corrigem bugs.
> 
> `refactor: encapsula logica em uma funcao no arquivo utils`
> 
> `refactor: renomeia nome do metodo de usuario`
> 

> **docs**
> 
> 
> Alterações de documentação (normalmente em arquivos .md).
> 
> `docs: atualiza README.md`
> 
> `docs: adiciona changelog das mudancas do cypress`
> 

> **style**
> 
> 
> Ajustes de formatação.
> 
> `style: formata arquivo de acordo com o prettier`
> 
> `style: adiciona \n no fim do arquivo`
> 

> **build**
> 
> 
> Mudanças nas dependências ou nos scripts de build.
> 
> `build: ajusta configuracoes de conversao de arquivos ts para js na geracao da build`
> 
> `build: atualiza versao do yarn`
> 

> **ci**
> 
> 
> Mudanças na configuração de CI e scripts.
> 
> `ci: atualiza gitlab-ci.yml`
> 
> `ci: executa testes unitarios antes do commit`
> 

> **perf**
> 
> 
> Melhoria de performance.
> 
> `perf: adiciona cache na listagem de registros`
> 
> `perf: migra query de ORM para uma query nativa SQL`
> 

> **test**
> 
> 
> Modificações em testes.
> 
> `test: corrige teste e2e cypress da tela de login`  
> 
> `test: adiciona testes unitarios ao crud de sebos`
> 

---

### DESCRIPTION

A DESCRIPTION representa as alterações do seu commit de forma sucinta.

Comece a descrição com um verbo no presente do indicativo. **Evite usar gerúndio ou pretérito.**

Não devemos utilizar caracteres específicos de línguas derivadas do latim (`^` `´` ``` `~` `ç` ).

> **Exemplo**
> 
> 
> Ao invés de:
> 
> `feat: adicionando validacao de formulario`
> 
> `feat: adicionada validacao de formulario`
> 
> prefira:
> 
> `feat: adiciona validacao de formulario`
> 

### Dicas

> Para ajudar na construção da DESCRIPTION, tente responder à seguinte pergunta:
> 
> 
> - *O que esse commit faz?*
> 
> ---
> 
> **Exemplo 1:**
> 
> - *O que esse commit faz?*
> 
> Esse commit **adiciona validação de formulário**→`feat: adiciona validacao de formulario`
> 
> **Exemplo 2:**
> 
> - *O que esse commit faz?*
> 
> Esse commit **atualiza a versão do gradle** → `build: atualiza a versao do gradle`
> 

---

## Branches

> **Estrutura de nome**
> 
> 
> `{ISSUE_NUMBER}-{DESCRIPTION}`
> 

---

### ISSUE_NUMBER

Adicione o número da sua issue do github. Ao criar o PR, o github fará um link automático com a sua issue.

---

### DESCRIPTION

Utilize o *kebab-case* para definir a DESCRIPTION.

Comece a DESCRIPTION com um verbo no presente do indicativo.

Procure resumir a descrição para 3 a 5 palavras que resumem o objetivo da branch de forma sucinta e mais abstrata, mesmo que isso signifique ferir a estrutura gramatical da frase. Evite nomes de branches muito longos.

> **Exemplo**
> 
> 
> Ao invés de escolher uma longa DESCRIPTION gramaticalmente correta como:
> 
> `9999-corrige-os-bugs-apontados-pelo-sonarqube`
> 
> Opte por algo mais sucinto: foque nas *keywords*:
> 
> `9999-corrige-bugs-sonarqube`
> 

### Dicas

> Para ajudar na construção da DESCRIPTION, tente responder à seguinte pergunta:
> 
> 
> - *O que essa branch faz?*
> 
> ---
> 
> **Exemplo 1:**
> 
> - *O que essa branch faz?*
> 
> Essa branch **adiciona uma nova modal de importação**→ `9999-adiciona-modal-importacao`
> 
> **Exemplo 2:**
> 
> - *O que essa branch faz?*
> 
> Essa branch **corrige o armazenamento das datas de cadastro no banco de dados** → `9999-corrige-datas-cadastr0`
> 

---

### Referências:

https://www.conventionalcommits.org/pt-br/v1.0.0/

https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines

https://stackoverflow.com/questions/3580013/should-i-use-past-or-present-tense-in-git-commit-messages

https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/#atomic-commits-and-the-single-responsibility-principle