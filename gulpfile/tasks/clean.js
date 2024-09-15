// Task to clean the destination folder by deleting all files in it
import { deleteAsync } from 'del';
import config from '../config.js';

/**
 * Asynchronously deletes all files in the destination folder specified in the config.
 * @returns {Promise<void>} A promise that resolves when the files are deleted.
 */
const clean = async () => {
  await deleteAsync(`${config.dest}/*`);
};

export default clean;
