pragma solidity ^0.4.7;


contract votingTemplate {

    // constructor
    function votingTemplate(string _name, string _description, bool _publicVoting, address[] _participants){
        name = _name;
        description = _description;
        publicVoting = _publicVoting;
        participants = _participants;
    }

    // define contract variables
    string public name;
    string public description;
    bool public publicVoting;

    address[] participants;
    uint[] votes = [0,0];
    //
    mapping (address => bool) voted;

    // modifier isAllowed () {}

    // functions
    //    function vote(uint option) {
    //        if (voted[msg.sender] != true) {
    //            voted[msg.sender] = true;
    //            votes[option] += 1;
    //        }
    //        else {
    //            throw;
    //        }
    //    }

    function vote(uint option) {
        votes[option] =  votes[option]+1;
    }

    // constant functions
    function getVotesFor() constant returns (uint){
        return votes[1];
    }

    function getVotesAgainst() constant returns (uint){
        return votes[0];
    }
}
