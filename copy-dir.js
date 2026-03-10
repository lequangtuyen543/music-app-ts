const fs = require('fs-extra');

fs.copy('public', 'dist/public');
fs.copy('views', 'dist/views');