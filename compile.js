const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Get the path of the contract file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Compile the contract
module.exports = solc.compile(source, 1).contracts[':Inbox'];