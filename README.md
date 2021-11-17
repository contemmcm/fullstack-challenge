# Fullstack Challenge

## Stack utilizada

### Backend
- NodeJS
- Framework: NestJS
- Banco de Dados: PostgreSQL
- API Docs: Swagger
- Autenticação: JWT

### Frontend
 - ReactJS
 - JHipster

## Instruções de Uso (docker-compose)

```bash
docker-compose build
docker-compose up
```

Para carregar as fixtures, execute o seguinte comando (em outro terminal):

```bash
docker-compose exec backend ./sql/db_restore.sh
```
