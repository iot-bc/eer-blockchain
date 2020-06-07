/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:32
 * @Filename: acContract.js
 * @Function: do nothing >_>
 */

const {Contract, Context} = require("fabric-contract-api");

const AccessControl = require("./ledger/ac");
const AccessControlList = require("./ledger/acList");

class AccessControlContext extends Context {
  constructor() {
    super();
    this.acList = new AccessControlList(this);
  }
}

class AccessControlContract extends Contract {
  constructor() {
    super("org.eer.ac");
  }

  createContext() {
    return new AccessControlContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the AccessControl Contract");
  }

  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger ===========");
    // initLedger
    console.info("=============  END : Initialize Ledger  ===========");
  }

  async queryAll(ctx) {
    return ctx.acList;
  }

  async addPolicy(ctx, subject, object, operation, role, description) {
    let ac = AccessControl.createInstance(subject, object, operation, role, description);

    ac.activiate();

    await ctx.acList.addAccessControl(ac);

    return ac;
  }

  // async updatePolicy(ctx) {
  //
  // }

  async deletePolicy(ctx, subject, object) {
    let acKey = makeACKey(subject, object);
    let ac = await ctx.acList.getAccessControl(acKey);

    if (ac)
      await ctx.acList.deleteAccessControl(acKey);

    return ac;
  }

  async checkPolicy(ctx, subject, object) {
    let acKey = makeACKey(subject, object);
    let ac = await ctx.acList.getAccessControl(acKey);

    if (ac && ac.getCurrentState()) {
      return ac.getOperation();
    } else return false;

  }

  async dropPolicy(ctx, subject, object) {
    let acKey = makeACKey(subject, object);
    let ac = await ctx.acList.getAccessControl(acKey);

    ac.drop();
    await ctx.acList.updateAccessControl(ac)
  }

  // async ...
}

function makeACKey(subject, object) {
  return AccessControl.makeKey([subject, object])
}

module.exports = AccessControlContract;
