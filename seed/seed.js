import db from "../config/db.js";
import categoriesSeed from "./categoriesSeed.js";

try {
    await db.authenticate();
    await db.sync();
    await categoriesSeed();

    await db.close();
    process.exit(0)
} catch (error) {
    console.log(error);

    try { await db.close(); } catch (error) { }
    process.exit(1)
}