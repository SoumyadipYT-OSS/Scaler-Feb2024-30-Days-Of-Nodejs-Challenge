const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    const actualExtension = path.extname(filePath);
    const result = actualExtension === expectedExtension;

    if (result) {
        console.log('File has the expected extension:', expectedExtension);
    } else {
        console.log('FIle does not have the expected extension. Expected:', expectedExtension, 'Actual:', actualExtension);
    }
}

// Test cases:
checkFileExtension('test-files/file1.txt', '.txt');
checkFileExtension('test-files/image.png', '.jpg');