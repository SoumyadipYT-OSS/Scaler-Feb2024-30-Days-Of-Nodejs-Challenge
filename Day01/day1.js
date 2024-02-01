const fs = require('fs');

function readFileContent(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('\nError reading file:', err);
      return;
    }
    console.log('\nFile Content:');
    if (data.length === 0) {
      console.log('(empty string)');
    } else {
      console.log(data);
    }
  });
}


// Test Cases:
readFileContent('test-files/file1.txt'); 
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt'); 