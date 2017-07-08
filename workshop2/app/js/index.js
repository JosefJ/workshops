/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================
$(document).ready(function() {

  $("#blockchain button.set").click(function() {
    var value = document.getElementById('hash').innerHTML;
    SimpleStorage.set(value).then(function(response) {
        var txHash = response.transactionHash;
        addToLog("#blockchain", "SimpleStorage.set called");
        addToLog("#blockchain", "Tx hash: "+ txHash);
    });
  });

  $("#blockchain button.get").click(function() {
    SimpleStorage.get().then(function(value) {
      $("#blockchain .value").html(value);
    });
    addToLog("#blockchain", "SimpleStorage.get()");
  });

});

