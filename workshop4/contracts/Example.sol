pragma solidity ^0.4.11;

import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/StandardToken.sol';

contract Crowdsourcing is StandardToken{

    // Task (optional) use SafeMath functions on uint256 instances;
    using SafeMath for uint256;

    // Task (optional): set your own constants
    string constant public name = "Name";
    string constant public symbol = "abc";
    uint8 constant public decimals = 18;
    uint256 constant public totalSupply = 10*1000000000000000000000000;
    uint256 tokensSold = 0;

    bool public stopped;

    address owner;

    function Crowdsourcing() {
        // Task 1: set var owner to the contract issuer;
        owner = msg.sender;
    }

    function() payable {
        require(!stopped);
        // Task 2: implement a token sale function
        // Hints:
        // 1. use "balances[msg.sender]" mapping to assign balances
        // 2. use "msg.value" to get the transaction value
        // 3. add a "payable" parameter to the fallback function
        // 4. use a "tokensSold" var to check if there are tokens left

        uint256 howMany = (msg.value)*5;
        assert(howMany < (totalSupply-tokensSold));

        balances[msg.sender] += howMany ;
        tokensSold += howMany;


        // call an event
        TokensAssigned(msg.sender, howMany);
    }

    function finalize() {
        require(owner == msg.sender);
        // Task 3: implement a finalization function with withdrawal
        //  a) add a "stopped" global boolean variable (true/false)
        //  b) add a requirement for the stop bool to be false in the fallback function using "require(...);" check
        //  c) add a finalization event anc call it in this function
        //  Hint: use "owner.transfer(this.balance)" to make the transfer
        owner.transfer(this.balance);

        stopped = true;
        Fin(tokensSold);

    }
    event Fin(uint256 tokens);
    event TokensAssigned(address indexed _to, uint256 _amoumt);
}

