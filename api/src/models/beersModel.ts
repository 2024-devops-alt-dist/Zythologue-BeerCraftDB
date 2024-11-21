import { pool } from "../config/db";

export const beersModel = {
  // Logic to get all beers
  get: async () => {
    const query = "SELECT * FROM beers";
    const { rows } = await pool.query(query);
    return rows;
  },
  // Logic to get a beer by ID
  getById: async (id: number) => {
    const query = "SELECT * FROM beers WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows;
  },
  // Logic to create a new beer
  post: async (
    name: string,
    description: string,
    abv: number,
    price: number,
    id_brewery: number
  ) => {
    const query =
      "INSERT INTO beers (name, description, abv, price, id_brewery) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [
      name,
      description,
      abv,
      price,
      id_brewery,
    ]);
    return rows;
  },
  // Logic to update a beer by ID
  put: async (
    id: number,
    name: string,
    description: string,
    abv: number,
    price: number,
    id_brewery: number
  ) => {
    const query =
      "UPDATE beers SET name = $1, description = $2, abv = $3, price = $4, id_brewery = $5 WHERE id = $6 RETURNING *";
    const { rows } = await pool.query(query, [
      name,
      description,
      abv,
      price,
      id_brewery,
      id,
    ]);
    return rows;
  },
  // Logic to delete a beer by ID
  delete: async (id: number) => {
    const query = "DELETE FROM beers WHERE id = $1";
    await pool.query(query, [id]);
  },
};
