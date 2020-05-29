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

  async initLedger(ctx){
    console.log("++++ init access control ledger ++++ ")
    const acl = [
      {
        subject: "1",
        object: "1-1",
        operation: "R",
        role: "OWNER"
      },
      {
        subject: "2",
        object: "2-1",
        operation: "R",
        role: "OWNER"
      },
      {
        subject: "3",
        object: "1-1",
        operation: "R",
        role: "TEACHER"
      }
    ];
    for(let i=0;i<acl.length;i++){
      await ctx.stub.putState("ACL"+i, Buffer.from(JSON.stringify(acl[i])))
      console.info('Added <--> ', acl[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryAcl(ctx) {
    const startKey = 'ACL0';
    const endKey = 'ACL999';
    const allResults = [];
    for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
      const strValue = Buffer.from(value).toString('utf8');
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    console.info(allResults);
    return JSON.stringify(allResults);
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
