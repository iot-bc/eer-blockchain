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

  async addIdentityPair(ctx, realID, fakeID) {
    let _id = Identity.createInstance(realID, fakeID);

    await ctx.idList.addIdentity(_id);

    return _id;
  }

  async getRealIdentity(ctx, fakeID) {
    let idKey = Identity.makeKey(["ID", fakeID]);

    return await ctx.idList.getIdentity(idKey);
  }

  async deleteIdentityPair(ctx, fakeID) {
    let idKey = Identity.makeKey(["ID", fakeID]);

    let realID = await ctx.idList.getIdentity(idKey);
    await ctx.idList.deleteIdentity(idKey);

    return realID;
  }

}

module.exports = IdentityContract;
