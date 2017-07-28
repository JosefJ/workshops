/**
 * Created by Josef on 7/26/2017.
 */
var contract;
var loadContract = function(_address) {
    return new Promise(function(resolve, reject) {
        contract = basicToken;
        contract.address = _address;
        resolve(contract);
    });
};

var loadData = function(_contract) {
    return new Promise(function(resolve, reject) {
        $("span", "#tName").text(_contract.name());
        $("span", "#tSymbol").text(_contract.symbol());
        $("span", "#tTotalSupply").text(_contract.totalSupply());
        $("span", "#tDecimals").text(_contract.decimals());
    });
}


/*
*       User interface controls
 */

$("#loadToken","button").click(function() {
   loadContract($("input[name=contractAddress]", "#loadToken").val())
       .then(function(result) {
           loadData(result);
           $("#contractLoaded").fadeIn('slow');

       }


   )
});


// totalSupply() constant returns (uint256 totalSupply)

// balanceOf(address _owner) constant returns (uint256 balance)

// transfer(address _to, uint256 _value) returns (bool success)

// transferFrom(address _from, address _to, uint256 _value) returns (bool success)

// approve(address _spender, uint256 _value) returns (bool success)

// allowance(address _owner, address _spender) constant returns (uint256 remaining)


// event Transfer(address indexed _from, address indexed _to, uint256 _value)
// event Approval(address indexed _owner, address indexed _spender, uint256 _value)