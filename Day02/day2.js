const fs = require('fs');

function writeToFile(filePath, content) {
    // checking for the valid path
    if (!filePath || !content) {
        throw new Error("Invalid input: File path and content cannot be empty.");
    }

    try {
        fs.writeFileSync(filePath, content);
        console.log('Data written to ' + filePath);
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}


// Test the function with different scenarios
writeToFile('test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');