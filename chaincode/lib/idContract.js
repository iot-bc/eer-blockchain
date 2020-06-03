/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:54
 * @Filename: idContract.js
 * @Function: do nothing >_>
 */

const {Contract, Context} = require("fabric-contract-api");

const Identity = require("./ledger/id");
const IdentityList = require("./ledger/idList");

class IdentityContext extends Context {
  constructor() {
    super();
    this.idList = new IdentityList(this);
  }
}

class IdentityContract extends Contract {

  constructor() {
    super("org.eer.id");
  }

  createContext() {
    return new IdentityContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the Identity Contract");
  }

  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger ===========");
    // initLedger
    console.info("=============  END : Initialize Ledger  ===========");
  }

  // fnssss todo
}

module.exports = IdentityContract;
