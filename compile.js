const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Get the path of the contract file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Prepare the input for the compiler
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'], // Select all output
            },
        },
    },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for compilation errors
if (output.errors) {
    output.errors.forEach(err => {
        console.error(err.formattedMessage);
    });
}

// Export the ABI and bytecode
module.exports = {
    abi: output.contracts['Inbox.sol'].Inbox.abi,
    bytecode: output.contracts['Inbox.sol'].Inbox.evm.bytecode.object,
};