
const chokidar = require('chokidar')
const directoryPath = "."

// Initialize watcher
const watcher = chokidar.watch(directoryPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});



// Add event listeners
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('error', error => console.error(`Watcher error: ${error}`));

console.log(`Watching for changes in ${directoryPath}`);
