/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:53
 * @Filename: keyContract.js
 * @Function: do nothing >_>
 */

const {Contract, Context} = require("fabric-contract-api")

const Key = require("./ledger/key")
const KeyList = require("./ledger/keyList");


class KeyContext extends Context{
  constructor() {
    super();
    this.keyList = new KeyList(this);
  }
}

class KeyContract extends Contract{

  constructor() {
    super("org.eer.key");
  }

  createContext() {
    return new KeyContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the Key Contract");
  }

  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger ===========");
    // initLedger
    console.info("=============  END : Initialize Ledger  ===========");
  }

  // fnssss todo
}
