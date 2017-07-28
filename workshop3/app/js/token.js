/**
 * Created by Josef on 7/26/2017.
 */

/*
 *   Web3 / Metamask handling
 */

if (typeof window.web3 !== 'undefined') {
    injectedProvider = window.web3.currentProvider;
    web3 = new Web3(injectedProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var mmrpc, lhrpc;

if (web3.currentProvider.hasOwnProperty("multiStream")) {
    web3.dest = "metamask";
    mmrpc = web3;
} else if (web3.currentProvider.host.indexOf("/localhost:") != -1) {
    web3.dest = "localhost";
    lhrpc = web3;
} else {
    console.log("Your RCP is too hipster for me to swallow!");
}

if (web3.dest == "metamask") {
    lhrpc = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    $("#option_mmrpc").addClass("active");
    console.log("Metamask is active");
}
else if (mmrpc === undefined) {
    $("#option_mmrpc").hide();
    console.log("Metamask is not loaded");
}

$("li","#rpcSelector").click(function(event) {
    $("li","#rpcSelector").removeClass("active");
    $(this).addClass("active");

    if ($(this).attr('id') == "option_mmrpc") {
        web3 = mmrpc;
        console.log("Metamask was hooked");
    } else if ($(this).attr('id') == "option_lhrpc") {
        web3 = lhrpc;
        console.log("Local RPC was hooked");
    } else {
        console.log("Element ID missing, can't decide => doing nothing");
    }
    event.preventDefault();
});

/*
 *  Token related code
 */
var contract;
var loadContract = function(_address) {
    return new Promise(function(resolve, reject) {
        contract = new EmbarkJS.Contract({
            abi: WorkshopToken.abi,
            address: _address
        });

        resolve(contract);
    });
};

var decimals = 0;
var loadData = function(_contract) {
    return new Promise(function(resolve, reject) {

        _contract.name()
            .then(function (result) {
                $("span", "#tName").text(result);
        });
        _contract.symbol()
            .then(function (result) {
                $("span", "#tSymbol").text(result);
            });

        if (typeof _contract.decimals !== "undefined") {
            _contract.decimals()
                .then(function (result) {
                    decimals = result;
                    $("span", "#tDecimals").text(result);

                    _contract.totalSupply()
                        .then(function (result) {
                            $("span", "#tTotalSupply").text(result/Math.pow(10, decimals));
                        });

                });
        } else {
            _contract.totalSupply()
                .then(function (result) {
                    $("span", "#tTotalSupply").text(result/Math.pow(10, decimals));
                });
        }



        resolve("Contract queried for data!")
    });
};


/*
*       User interface controls
 */

$("button", "#loadToken").click(function() {
   loadContract($("input[name=contractAddress]", "#loadToken").val())
       .then(function(result) {
           loadData(result).then(function(result) {
               $("#contractLoaded").fadeIn('slow');
           });
       }
   )
});

$("button", "#tBalanceOf").off().click(function() {
    var _address = $("input[name=balanceOf]", "#tBalanceOf").val();

    contract.balanceOf(_address)
        .then(function(result) {
            $("div span", "#tBalanceOf").text((web3.toDecimal(result)/Math.pow(10, decimals)));
            console.log(result);
        })
        .catch(function(result) {
            console.log(result)
        });
});

$("button", "#tTransfer").off().click(function() {
    var _to = $("input[name=transfer_to]", "#tTransfer").val();
    var _value = $("input[name=transfer_value]", "#tTransfer").val();

    contract.transfer(_to, _value)
        .then(function(result) {
            $("div span", "#tTransfer").text(result.transactionHash);
            console.log(result);
        })
        .catch(function(result) {
            console.log(result)
        });
});

$("button", "#tTransferFrom").off().click(function() {
    var _from = $("input[name=transferFrom_from]", "#tTransferFrom").val();
    var _to = $("input[name=transferFrom_to]", "#tTransferFrom").val();
    var _value = $("input[name=transferFrom_value]", "#tTransferFrom").val();

    contract.transferFrom(_from, _to, _value)
        .then(function(result) {
            $("div span", "#tTransferFrom").text(result.transactionHash);
            console.log(result);
        })
        .catch(function(result) {
            console.log(result)
        });
});

$("button", "#tApprove").off().click(function() {
    var _to = $("input[name=approve_spender]", "#tApprove").val();
    var _value = $("input[name=approve_value]", "#tApprove").val();

    contract.approve(_to, _value)
        .then(function(result) {
            $("div span", "#tApprove").text(result.transactionHash);
            console.log(result);
        })
        .catch(function(result) {
            console.log(result)
        });
});

$("button", "#tAllowance").off().click(function() {
    var _owner = $("input[name=allowance_owner]", "#tAllowance").val();
    var _spender = $("input[name=approve_spender]", "#tAllowance").val();

    contract.transfer(_owner, _spender)
        .then(function(result) {
            $("div span", "#tApprove").text((web3.toDecimal(result)/Math.pow(10, decimals)));
            console.log(result);
        })
        .catch(function(result) {
            console.log(result)
        });
});

// event Transfer(address indexed _from, address indexed _to, uint256 _value)
// event Approval(address indexed _owner, address indexed _spender, uint256 _value)