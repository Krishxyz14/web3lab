// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
    address payable[] public players;
     address manager;
     address payable public winner;

     constructor(){
         manager=msg.sender;
     }
     receive() external payable{
         require(msg.value == 1 ether, "please pay 1 ether only");
         players.push(payable(msg.sender));
     }

     function getBalance() public view returns(uint){
         require(manager==msg.sender,"You are not the manager");
         return address(this).balance;
     }
     function random() internal view returns(uint){
         return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players.length)));

     }
     function pickWinner() public {
         require(msg.sender==msg.sender,"You are not manager");
         require(players.length>=3,"Players are less than 3");

         uint r = random();
         uint index = r%players.length; // 100%3 = 1 24%3=0 remainder < players.length;
         winner=players[index];
         winner.transfer(getBalance());
         players = new address payable[](0);

     }
     function allplayers() public view returns(address payable[] memory){
         return players;
     }

}
//0xfd32ebf88a50cab00166538ea704f37738796c7e
// ganache - 0xc18783bEF35bf7971185399b8C7F34b2C104dbA5