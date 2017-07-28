pragma solidity ^0.4.11;


import './StandardToken.sol';


contract WorkshopToken is StandardToken{
    string constant public name = "Workshop token";
    string constant public symbol = "WST";
    uint8 constant public decimals = 0;
    uint256 public totalSupply = 1;
}
