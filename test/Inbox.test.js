// inbox.test.js
const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);

    // Use one of those accounts to deploy the contract
    try {
        inbox = await new web3.eth.Contract(abi)
            .deploy({
                data: '0x' + bytecode, // Add '0x' prefix to bytecode
                arguments: ['Hi there!']
            })
            .send({ from: accounts[0], gas: '1000000' });
        console.log('Contract deployed at:', inbox.options.address);
    } catch (error) {
        console.error('Deployment error:', error);
    }
});

describe('Inbox', () => {
    it('deploys a contract', () => {
            assert.ok(inbox.options.address); // Check if the contract has an address
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi there!');
    });
});