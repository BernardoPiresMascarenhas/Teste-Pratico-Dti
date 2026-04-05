# Desafio Técnico dti digital - Gestão de Notas (Professor Carlos)

Este projeto foi desenvolvido como parte do teste técnico para a vaga de Estagiário(a) de Desenvolvimento na dti digital. Trata-se de uma aplicação Full-Stack construída para auxiliar o "Professor Carlos" no gerenciamento ágil de notas e frequências de seus alunos, realizando o cálculo automático de médias e aplicando filtros de regras de negócio.

## Tecnologias Utilizadas

**Front-end:**
* **React + Vite:** Escolhido pela performance extrema no ambiente de desenvolvimento (HMR) e por ser o padrão mais moderno da indústria atualmente para inicialização de projetos React.
* **Tailwind CSS:** Utilizado para criar uma interface moderna, responsiva e focada na experiência do usuário (estilo *Glassmorphism*), garantindo um código limpo e sem a necessidade de arquivos CSS gigantescos.

**Back-end:**
* **Node.js + Express:** Framework minimalista e rápido, ideal para construir a API RESTful que recebe os dados do front-end e processa a lógica de negócio exigida no teste.
* **CORS:** Middleware utilizado para permitir a comunicação segura entre as portas do Front-end e Back-end.

---

## Como executar o projeto localmente

### Pré-requisitos
Você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

O projeto é dividido em duas pastas: `front-dti` e `back-dti`. Siga os passos abaixo em **dois terminais diferentes**.

### 1. Rodando o Servidor (Back-end)
Abra um terminal, navegue até a pasta do back-end e inicie o servidor:

```bash
cd back-dti
npm install
npm start
```

O servidor estará rodando em http://localhost:3000.

### 2. Rodando a Interface (Front-end)
Abra um novo terminal, navegue até a pasta do front-end e inicie a aplicação Vite:

```bash
cd front-dti
npm install
npm run dev
```

A aplicação estará disponível no seu navegador, geralmente em http://localhost:5173/.

## Premissas Assumidas
Durante o desenvolvimento, as seguintes premissas foram adotadas:

- Dados em Memória: Como o escopo não exigia persistência complexa (banco de dados), a lista de alunos é gerenciada no estado do React e enviada integralmente ao Node.js a cada cálculo.

- Validação de Entrada: Assumi que o professor Carlos poderia cometer erros de digitação. Portanto, o front-end possui travas que impedem o cadastro se houver campos em branco, e os inputs numéricos são restritos de 0 a 10 (notas) e 0 a 100 (frequência).

- Formatação da Saída (Correção de Ambiguidade): Notei que o enunciado solicita textualmente a impressão no formato <Nome> <Média> <Frequência>, porém o "Exemplo de Saída" no documento PDF exibe todas as 5 notas originais do aluno em vez de sua média processada. Optei por seguir rigorosamente a regra textual do escopo, exibindo o cálculo real da média do aluno na saída do relatório, pois considerei ser o comportamento de software mais correto e esperado.


## Decisões de Projeto e Arquitetura

- Separação de Responsabilidades (Client-Server): Embora fosse possível resolver o teste inteiro apenas com JavaScript no Front-end, decidi implementar uma arquitetura Client-Server real. O React atua apenas como a camada de visualização (View), coletando dados de forma amigável, enquanto o Node.js atua como o "cérebro" (Controller/Service), centralizando toda a lógica matemática, manipulação de arrays (map, reduce, filter) e regras de negócio exigidas pelo teste.

- Tratamento de Dados: As strings coletadas pelo formulário são devidamente tipadas e convertidas para numerais (Number()) antes de qualquer operação matemática no Back-end, evitando concatenações indesejadas que poderiam gerar bugs silenciosos.

- UX/UI: O design foi focado em parecer uma ferramenta de gestão real e moderna, com um design centralizado e uso de feedback visual imediato para ações habilitadas/desabilitadas.