const Database = require('better-sqlite3');
const db = new Database('dev.db');
db.exec("UPDATE Topic SET image = replace(image, '.jpg', '.png') WHERE image LIKE '/uploads/topics/%.jpg'");
console.log('Database updated!');
