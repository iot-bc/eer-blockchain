/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:53
 * @Filename: keyContract.js
 * @Function: do nothing >_>
 */

const {Contract, Context} = require("fabric-contract-api");

const Key = require("./ledger/key");
const KeyList = require("./ledger/keyList");


class KeyContext extends Context {
  constructor() {
    super();
    this.keyList = new KeyList(this);
  }
}

class KeyContract extends Contract {

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

  async addKey(ctx, id, key) {

    if (await ctx.keyList.getKey(makeKeyKey(id))) {
      return false;
    }

    let _key = Key.createInstance(id, key);

    await ctx.keyList.addKey(_key);

    return _key;
  }

  async getKey(ctx, id) {
    let keyKey = makeKeyKey(id);

    let _key = await ctx.keyList.getKey(keyKey);

    if (_key) return _key.getKey();
    else return null;
  }

  async deleteKey(ctx, id) {
    let keyKey = makeKeyKey(id);

    let _key = ctx.keyList.getKey(keyKey);

    if (_key) {
      await ctx.keyList.deleteKey(keyKey);
      return _key.getKey();
    } else return false;
  }

}

function makeKeyKey(id) {
  return Key.makeKey(["KEY", id]);
}

module.exports = KeyContract;
