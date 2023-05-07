import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();


const __dirname = dirname(fileURLToPath(import.meta.url));

export const renderHome = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}