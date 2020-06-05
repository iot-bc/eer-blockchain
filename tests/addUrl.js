/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午9:47
 * @Filename: addUrl.js
 * @Function: do nothing >_>
 */

const fs = require("fs");
const yaml = require("js-yaml");
const {Wallets, Gateway} = require("fabric-network");
const Url = require("./../chaincode/lib/ledger/url");


// Main program function
async function main() {

  // A wallet stores a collection of identities for use
  const wallet = await Wallets.newFileSystemWallet("./identity/user/balaji/wallet");


  // A gateway defines the peers used to access Fabric networks
  const gateway = new Gateway();

  // Main try/catch block
  try {

    // Specify userName for network access
    const userName = "balaji";

    // Load connection profile; will be used to locate a gateway
    let connectionProfile = yaml.safeLoad(fs.readFileSync("./gateway/connection-org1.yaml", "utf8"));

    // Set connection options; identity and wallet
    let connectionOptions = {
      identity: userName,
      wallet: wallet,
      discovery: {enabled: true, asLocalhost: true}

    };

    // Connect to gateway using application specified parameters
    console.log("Connect to Fabric gateway.");

    await gateway.connect(connectionProfile, connectionOptions);

    // Access PaperNet network
    console.log("Use network channel: eerchannel.");

    const network = await gateway.getNetwork("eerchannel");

    // Get addressability to commercial paper contract
    console.log("Use org.eer.url smart contract.");

    const contract = await network.getContract("eer", "org.eer.url");

    // buy commercial paper
    console.log("Submit addUrl transaction.");

    await contract.submitTransaction('addUrl', "o1","d1","u1");

    // const addResponse = await contract.submitTransaction('addUrl', "o2","d2","u2");

    await contract.submitTransaction('updateUrl', "o1","d1","u3");

    const addResponse = await contract.submitTransaction("getUrl", "o1", "d1");

    // process response

    console.log("Process addUrl transaction response.");

    let url = Url.fromBuffer(addResponse);

    console.log(`${url.device} : ${url.url} successfully purchased by ${url.owner}`);
    console.log("Transaction complete.");

  } catch (error) {

    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);

  } finally {

    // Disconnect from the gateway
    console.log("Disconnect from Fabric gateway.");
    gateway.disconnect();

  }
}

main().then(() => {

  console.log("Buy program complete.");

}).catch((e) => {

  console.log("Buy program exception.");
  console.log(e);
  console.log(e.stack);
  process.exit(-1);

});