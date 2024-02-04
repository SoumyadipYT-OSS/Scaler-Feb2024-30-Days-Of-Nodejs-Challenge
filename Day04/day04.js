const path = require('path');

// function to resolve path
function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log(`Resolved Path: ${absolutePath}`);
}


// test cases
resolvePath('folder/file.txt');
resolvePath('nonexistent-folder/file.txt');