/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:32
 * @Filename: acContract.js
 * @Function: do nothing >_>
 */

const { Contract, Context } = require("fabric-contract-api");

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

  async addPolicy(ctx, subject, object, operation, role) {
    let ac = AccessControl.createInstance(subject, object, operation, role);

    ac.activiate();

    await ctx.acList.addAccessControl(ac);
  }

  // async updatePolicy(ctx) {
  //
  // }

  async deletePolicy(ctx, subject, object) {
    let acKey = AccessControl.makeKey([subject, object]);
    let ac = await ctx.acList.getAccessControl(acKey);

    ac.drop();

    await ctx.acList.updateAccessControl(ac);

    return ac;
  }

  async checkPolicy(ctx, subject, object) {
    let acKey = AccessControl.makeKey([subject, object]);
    let ac = await ctx.acList.getAccessControl(acKey);

    if (ac) return true;
  }

  // async ...
}

module.exports = AccessControlContract;
