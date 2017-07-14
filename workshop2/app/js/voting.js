/**
 * Created by buben42 on 07.07.2017.
 */
// STEP1
// Handle ballot formalization into a contract
// option pool creation

// contract objects
var newContract;
var loadedContract;

$(document).ready(function() {
    $('.delete').on('click', function () {
        $(this).closest('tr').remove();
    });

    $('.add').on('click', function () {
        option = $(this).closest('tr').find('input').val();
        var newOption = '<tr> <td> <input type="text" value="' + option + '"> <button class="delete"> delete </button></td></tr>';
        $(this).closest('tr').before(newOption);

        $('.delete').on('click', function () {
            $(this).closest('tr').remove();
        });
    });

    // collect all options to option pool variable
    function collectOptions() {
        var options = [];
        $('#options').find('table > tbody > tr').each(function () {
            if (!$(this).hasClass('ignore')) {
                options.push($(this).find('input').val());
            }
        })
        return options;
    }

    // publish ballot


    function startNewPoll() {
        name = $('input[type="text"]', '#name').val();
        description = $('textarea[name="description"]', '#descriptions').val();
        publicVoting = $('input[name=openness]:checked', '#openness').val();
        participants = $('textarea[name=participants]', '#voters').val().split('\n');

        votingTemplate.deploy([name, description, publicVoting, participants]).then(function (responseObj) {
            newContract = responseObj;


            $('input[type=text]', '#loadContract').val(newContract.address);
            loadContract(newContract.address);

            $('#createNew').hide();
            $('#interact').show();
        });
    }

    $('input[type=submit]', '#finalize').on('click', function () {
        startNewPoll()
    })


    // STEP 2
    // Handle existing ballot contract and provide interface

    // load universal ABI (Application Binary Interface) for
    var abi = votingTemplate.abi;

    function loadContract(_address) {
        loadedContract = new EmbarkJS.Contract({abi: abi, address: _address});

        loadedContract.name().then(function (response) {
            $('#nameLoaded').text(response);
        });

        loadedContract.description().then(function (response) {
            $('#descriptionLoaded').text(response);
        });

        loadedContract.publicVoting().then(function (response) {
            if (response) {
                $('#opennessLoaded').text("Public");
            }
            else {
                $('#opennessLoaded').text("Private");
            }
        })
        $('#loadedContract').show();

        $('#voteFor').on('click', function () {
            loadedContract.vote(1).then(function(response){
                txHash = response.transactionHash;
                console.log("vote txHash: " + txHash);
                getVotes();
            })
        })

        $('#voteAgainst').on('click', function () {
            loadedContract.vote(0).then(function(response){
                txHash = response.transactionHash;
                console.log("vote txHash: " + txHash);
                getVotes();
            })
        })

    }

    $('input[type=submit]', '#loadContract').on('click', function () {
        contractAddress = $('input[type=text]', '#loadContract').val();
        loadContract(contractAddress);
    })

    // STEP 3 - Load results
    function getVotes(){
        loadedContract.getVotesFor().then(function(response){
            votesFor = web3.toDecimal(response);
            $('#votesFor').text(votesFor);
        })

        loadedContract.getVotesAgainst().then(function(response){
            votesAgainst = web3.toDecimal(response);
            $('#votesAgainst').text(votesAgainst);
        })
    }
})



