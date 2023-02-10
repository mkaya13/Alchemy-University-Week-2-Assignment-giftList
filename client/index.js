const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  // Merkle Tree consists of 4 names
  const myTree = new MerkleTree(niceList);
  const myRoot = myTree.getRoot();

  // My Proof that Mert is inside MERKLE_ROOT of the server.
  const myProof = myTree.getProof(niceList.indexOf("Chris Windler")); // The index of Chris Windler is 3, we can also retrieve the index data from the client though!

  await axios.post(`${serverUrl}/gift`, {
    myProof,
    myRoot,
  });

  console.log(myProof);
}

main();
