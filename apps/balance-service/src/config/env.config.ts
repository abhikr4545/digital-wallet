export default () => ({
  port: parseInt(process.env.WALLET_SERVICE_PORT, 10),
  database: {
    host: process.env.BALANCE_SERVICE_POSTGRES_HOST,
    port: process.env.BALANCE_SERVICE_POSTGRES_PORT,
    user: process.env.BALANCE_SERVICE_POSTGRES_USER,
    password: process.env.BALANCE_SERVICE_POSTGRES_PASSWORD,
    database: process.env.BALANCE_SERVICE_POSTGRES_DATABASE,
  },
});