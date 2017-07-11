pragma solidity ^0.4.7;
contract SimpleStorage {
  string public storedData;

  function SimpleStorage(string initialValue) {
    storedData = initialValue;
  }

  function set(string x) {
    storedData = x;
  }

  function get() constant returns (string retVal) {
    return storedData;
  }

}
