import Dexie from 'dexie';

const db = new Dexie("ProductConfigurationOptions");
db.version(1).stores({ choices: "&url,choices" });

export default db;
