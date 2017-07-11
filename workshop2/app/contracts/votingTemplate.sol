pragma solidity ^0.4.7;


contract votingTemplate {

    // constructor
    function votingTemplate(string _name, string _description, bytes32[] _options, bool _publicVoting, address[] _participants){
        name = _name;
        description = _description;
        options = _options;
        publicVoting = _publicVoting;
        participants = _participants;
    }

    // define contract variables
    string public name;
    string public description;
    bytes32[] options;

    uint[] public votes;

    bool public publicVoting;
    address[] public participants;

    //
    mapping (address => bool) voted;

    // modifier isAllowed () {}

    // functions
    function vote(uint option) {
        if (voted[msg.sender] != true) {
            voted[msg.sender] = true;
            votes[option] += 1;
        }
        else {
            throw;
        }
    }
}
