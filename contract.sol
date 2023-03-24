/SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract RemixContract {
    string message;

    constructor()  {
        message = "Hello Ashutosh";
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

}
