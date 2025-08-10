import cron from 'node-cron';
import { deleteUsers } from '../services/user-delete-service';

// check this one out aswell

/*
en index.ts poner
import "./cron/cleanupUsersCron";
*/

cron.schedule('0 3 * * *', async () => {
  await deleteUsers(30);
});