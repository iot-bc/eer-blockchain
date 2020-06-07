/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/7 下午10:33
 * @Filename: testId.js
 * @Function: do nothing >_>
 */

const fs = require("fs");
const yaml = require("js-yaml");
const {Wallets, Gateway} = require("fabric-network");
const Identity = require("./../chaincode/lib/ledger/id");


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

    const contract = await network.getContract("eer", "org.eer.id");

    // buy commercial paper
    console.log("Submit testId transaction.");

    // await contract.submitTransaction('addIdentityPair', "r1","f1");
    // await contract.submitTransaction('addIdentityPair', "r2","f2");

    // const f1Response = await contract.evaluateTransaction("getRealIdentity", "f1");
    //
    // console.log(Identity.fromBuffer(f1Response));
    //
    // await contract.submitTransaction("deleteIdentityPair", "f1");

    const f2Response = await contract.evaluateTransaction("getRealIdentity", "f2");
    if(Buffer.from(JSON.stringify(f2Response)))
      console.log(Identity.fromBuffer(f2Response));
    else console.log("Not null")

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
