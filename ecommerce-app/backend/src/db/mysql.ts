import mysql, { Pool } from "mysql2/promise";

let pool: Pool | null = null;

const getDbConfig = () => {
  const host = process.env.DB_HOST || "localhost";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "nextgen_commerce";
  return { host, port, user, password, database };
};

export const initDatabase = async (): Promise<void> => {
  const { host, port, user, password, database } = getDbConfig();

  // Connect without a database first to ensure database exists
  const adminConnection = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
  await adminConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await adminConnection.end();

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  });

  // Ensure users table exists
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  );
};

export const getPool = (): Pool => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Call initDatabase() first.");
  }
  return pool;
};


