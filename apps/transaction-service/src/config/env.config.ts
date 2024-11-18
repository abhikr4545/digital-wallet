export default () => ({
  port: parseInt(process.env.WALLET_SERVICE_PORT, 10),
  database: {
    host: process.env.TRANSACTION_SERVICE_POSTGRES_HOST,
    port: process.env.TRANSACTION_SERVICE_POSTGRES_PORT,
    user: process.env.TRANSACTION_SERVICE_POSTGRES_USER,
    password: process.env.TRANSACTION_SERVICE_POSTGRES_PASSWORD,
    database: process.env.TRANSACTION_SERVICE_POSTGRES_DATABASE,
  },
});