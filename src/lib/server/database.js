// Import PrismaClient in JavaScript
import { PrismaClient } from "@prisma/client"

// Create a new PrismaClient instance
const db = new PrismaClient();

// Export the Prisma client for use in other files
export default db;