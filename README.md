# Projeto realizado com base [Nesse Desafio](https://gist.github.com/guilhermebr/fb0d5896d76634703d385a4c68b730d8)

## O desafio é criar uma API de transferencia entre contas internas de um banco digital.


### <p> Regras gerais </p>

- Usar formato JSON para leitura e escrita (ex: `GET /accounts/` retorna Json, `POST /accounts/` `{name: "John Doe"}`)

### <p> Rotas esperadas </p>

**`/accounts`**

A entidade `Account` possui os seguintes atributos:

- `id`
- `name`
- `cpf`
- `secret`
- `balance`
- `created_at`

### Espera-se as seguintes ações:

- `GET /accounts` - obtém a lista de contas
- `GET /accounts/{account_id}/balance` - obtém o saldo da conta
- `POST /accounts` - cria uma `Account`

### _Regras para esta rota_

- `balance` pode iniciar com 0 ou algum valor para simplificar
- `secret` deve ser armazenado como hash

<hr>

**`/login`**

A entidade `Login` possui os seguintes atributos:

- `cpf`
- `secret`

Espera-se as seguintes ações:

- `POST /login` - autentica o usuário

_Regras para esta rota_

- Deve retornar token para ser usado nas rotas autenticadas

<hr>

**`/transfers`**

A entidade `Transfer` possui os seguintes atributos:

- `id`
- `account_id`
- `account_destination_id`
- `amount`
- `created_at`

Espera-se as seguintes ações:

- `GET /transfers` - obtém a lista de transferência do usuario autenticado
- `POST /transfers` - faz transferência de uma `Account` para outra

_Regras para esta rota_

- Quem fizer a transferência precisar estar autenticado
- O `account_id` deve ser obtido no Token enviado
- Caso `Account` de origem não tenha saldo, retornar um código de erro apropriado
- Atualizar o `balance` das contas

<hr>

Tecnologias utilizadas:

- Nodejs
- TypeScript
- TypeORM
- PostgresSQL
- Bcrypt
- Jsonwebtoken
