/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午9:47
 * @Filename: addWallet.js
 * @Function: do nothing >_>
 */

const fs = require("fs");
const {Wallets} = require("fabric-network");
const path = require("path");

const fixtures = path.resolve(__dirname, "./../eer-network");

async function main() {

  // Main try/catch block
  try {

    // A wallet stores a collection of identities
    const wallet = await Wallets.newFileSystemWallet("./../config/identity/user/balaji/wallet");

    // Identity to credentials to be stored in the wallet
    const credPath = path.join(fixtures, "/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com");
    const certificate = fs.readFileSync(path.join(credPath, "/msp/signcerts/User1@org1.example.com-cert.pem")).toString();
    const privateKey = fs.readFileSync(path.join(credPath, "/msp/keystore/priv_sk")).toString();

    // Load credentials into wallet
    const identityLabel = "balaji";

    const identity = {
      credentials: {
        certificate,
        privateKey
      },
      mspId: "Org1MSP",
      type: "X.509"
    };

    await wallet.put(identityLabel, identity);

  } catch (error) {
    console.log(`Error adding to wallet. ${error}`);
    console.log(error.stack);
  }
}

main().then(() => {
  console.log("done");
}).catch((e) => {
  console.log(e);
  console.log(e.stack);
  process.exit(-1);
});