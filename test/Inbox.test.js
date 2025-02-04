const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

class Car {
    park() {
        return 'stopped';
    }
    
    drive() {
        return 'vroom';
    }
}

beforeEach( () => {
    
    console.log('beforeEach');
});


describe('Car', () => {
    it('can park', () => {
        const car = new Car();
        assert.strictEqual(car.park(), 'stopped'); // Updated to strictEqual
    });
    
    it('can drive', () => {
        const car = new Car();
        assert.strictEqual(car.drive(), 'vroom'); // Updated to strictEqual
    });
});