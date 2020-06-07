/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/7 下午10:33
 * @Filename: testKey.js
 * @Function: do nothing >_>
 */

const fs = require("fs");
const yaml = require("js-yaml");
const {Wallets, Gateway} = require("fabric-network");
const Key = require("./../chaincode/lib/ledger/key");


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
    console.log("Use org.eer.key smart contract.");

    const contract = await network.getContract("eer", "org.eer.key");

    // buy commercial paper
    console.log("Submit testKey transaction.");

    await contract.submitTransaction('addKey', "i1","k1");
    await contract.submitTransaction('addKey', "i2","k2");

    const f1Response = await contract.evaluateTransaction("getKey", "i1");

    console.log(f1Response);

    // await contract.submitTransaction("deleteKey", "i1");

    const f2Response = await contract.evaluateTransaction("getKey", "i2");
    console.log(f2Response);
    // if(Key.fromBuffer(f2Response))
    //   console.log(Key.fromBuffer(f2Response));
    // else console.log("Not null")

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

