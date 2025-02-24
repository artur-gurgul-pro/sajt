import fs from 'fs'
import path from 'path'

export function setWatcher(callback: (url: string) => void) {
// Directory to watch
const directoryPath = './';
// Ensure the directory exists
if (!fs.existsSync(directoryPath)) {
   fs.mkdirSync(directoryPath, { recursive: true });
}
console.log(`Watching for changes in: ${directoryPath}`);
// Watch the directory for changes
fs.watch(directoryPath, (eventType, filename) => {
   if (filename) {
       const fullPath = path.join(directoryPath, filename);
       console.log(`File ${filename} has been ${eventType}`);
       // Check if the file was added, changed, or deleted
       fs.stat(fullPath, (err, stats) => {
           if (err) {
               if (err.code === 'ENOENT') {
                   console.log(`File ${filename} was deleted.`);
               } else {
                   console.error(`Error checking file status: ${err.message}`);
               }
           } else {
               if (stats.isFile()) {
                   console.log(`File ${filename} exists with size: ${stats.size} bytes`);
               }
           }
       });
   } else {
       console.log('Filename not provided, but change detected.');
   }
});
}