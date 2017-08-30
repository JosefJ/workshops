pragma solidity ^0.4.11;

import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/StandardToken.sol';

contract crowdsourcing is StandardToken{

    // Task (optional) use SafeMath functions on uint256 instances;
    using SafeMath for uint256;

    // Task (optional): set your own constants
    string constant public name = "Name";
    string constant public symbol = "abc";
    uint8 constant public decimals = 0;
    uint256 constant public totalSupply = 1;
    uint256 tokensSold = 0;

    address owner;

    function() crowdsourcing{
        // Task 1: set var owner to the contract issuer;
    }

    function() {
        // Task 2: implement a token sale function
        // Hints:
        // 1. use "balances[msg.sender]" mapping to assign balances
        // 2. use "msg.value" to get the transaction value
        // 3. add a "payable" parameter to the fallback function
        // 4. use a "tokensSold" var to check if there are tokens left

        // call an event
        TokensAssigned(_to, _amount);
    }

    function finalize() {
        require(owner == msg.sender);
        // Task 3: implement a finalization function with withdrawal
        //  a) add a "stopped" global boolean variable (true/false)
        //  b) add a requirement for the stop bool to be false in the fallback function using "require(...);" check
        //  c) add a finalization event anc call it in this function
    }

    event TokensAssigned(address indexed _to, uint256 _amoumt);
}
