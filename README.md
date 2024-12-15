
# API de Gerenciamento de Reservas de Salas

## Descrição
Esta API permite o gerenciamento de reservas de salas, incluindo criação, listagem, atualização e exclusão de reservas e salas. Além disso, verifica conflitos de horários para garantir que não haja sobreposição de reservas para uma mesma sala.

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose

## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/JETEJ-Org/KeyRoomAPI-GerenciadorDeSalas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
MONGO_URI=mongodb://<seu-banco-de-dados>
```

4. Inicie a aplicação:
```bash
npm start
```
---

## Endpoints
---

### - Salas

#### 1. Listar Salas
- **URL:** `/salas`
- **Método:** `GET`
- **Descrição:** Retorna todas as salas cadastradas.

**Resposta:**
```json
[
  {
    "_id": "21",
    "tipo": "Aula",
    "capacidade": 40,
    "local": "2º Andar - Bloco de Teste"
  },
  {
    "_id": "15",
    "tipo": "Laboratório",
    "capacidade": 30,
    "local": "1º Andar - Bloco de Teste"
  }
]
```

#### 2. Criar Sala
- **URL:** `/salas`
- **Método:** `POST`
- **Descrição:** Adiciona uma nova sala.

**Body:**
```json
{
  "sala": "21",
  "tipo": "Aula",
  "capacidade": 40,
  "local": "2º Andar - Bloco de Teste"
}
```

**Resposta:**
```json
{
  "sala": "21",
  "tipo": "Aula",
  "capacidade": 40,
  "local": "2º Andar - Bloco de Teste"
}
```

#### 3. Atualizar Sala
- **URL:** `/salas/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza uma sala existente pelo ID.

**Body:**
```json
{
  "tipo": "Treinamento",
  "capacidade": 15,
  "local": "2º Andar"
}
```

**Resposta:**
```json
{
  "_id": "15",
  "tipo": "Treinamento",
  "capacidade": 15,
  "local": "2º Andar"
}
```

#### 4. Deletar Sala
- **URL:** `/salas/:id`
- **Método:** `DELETE`
- **Descrição:** Remove uma sala pelo ID.

**Resposta:**
```json
{
  "message": "Sala 15: deletada com sucesso"
}
```

### - Reservas

#### 1. Listar Reservas
- **URL:** `/reservas`
- **Método:** `GET`
- **Descrição:** Retorna todas as reservas cadastradas.

**Resposta:**
```json
[
  {
    "_id": "64f77eec",
    "sala_id": "2",
    "pessoa": "João Silva",
    "data": "2024-12-14",
    "horario_inicio": "10:00",
    "horario_termino": "12:00",
    "detalhes": "Apresentação do projeto"
  }
]
```

#### Criar Reserva
- **URL:** `/reservas`
- **Método:** `POST`
- **Descrição:** Adiciona uma nova reserva para uma sala.

**Body:**
```json
{
  "sala_id": "2",
  "pessoa": "João Silva",
  "data": "2024-12-14",
  "horario_inicio": "10:00",
  "horario_termino": "12:00",
  "detalhes": "Apresentação do projeto"
}
```

**Resposta:**
```json
{
  "_id": "64f77eec",
  "sala_id": "2",
  "pessoa": "João Silva",
  "data": "2024-12-14",
  "horario_inicio": "10:00",
  "horario_termino": "12:00",
  "detalhes": "Apresentação do projeto"
}
```

#### Atualizar Reserva
- **URL:** `/reservas/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza uma reserva existente pelo ID.

**Body:**
```json
{
  "pessoa": "Maria Oliveira",
  "data": "2024-12-15",
  "horario_inicio": "14:00",
  "horario_termino": "16:00",
  "detalhes": "Treinamento de equipe"
}
```

**Resposta:**
```json
{
  "_id": "64f77eec",
  "sala_id": "15",
  "pessoa": "Maria Oliveira",
  "data": "2024-12-15",
  "horario_inicio": "14:00",
  "horario_termino": "16:00",
  "detalhes": "Treinamento de equipe"
}
```

#### Deletar Reserva
- **URL:** `/reservas/:id`
- **Método:** `DELETE`
- **Descrição:** Remove uma reserva pelo ID.

**Resposta:**
```json
{
  "message": "Reserva removida com sucesso"
}
```

#### Verificar Conflito de Horário
Antes de criar uma nova reserva, a API verifica conflitos de horários. Se houver sobreposição, a resposta será:
```json
{
  "message": "Conflito de horário com outra reserva"
}
```
---

## Validações
- **Salas**:
  - `_id`, `tipo`, `capacidade` e `local` são obrigatórios.
- **Reservas**:
  - `sala_id`, `pessoa`, `data`, `horario_inicio` e `horario_termino` são obrigatórios.
  - A lógica de conflitos verifica sobreposições no mesmo dia e sala.
