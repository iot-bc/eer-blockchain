/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:42
 * @Filename: acList.js
 * @Function: do nothing >_>
 */

const StateList = require("./state/stateList");

const AccessControl = require("./ac");

class AccessControlList extends StateList {
  constructor(ctx) {
    super(ctx, "org.eer.acList");
    this.use(AccessControl);
  }

  async addAccessControl(ac) {
    return this.addState(ac);
  }

  async getAccessControl(acKey) {
    return this.getState(acKey);
  }

  async updateAccessControl(ac) {
    return this.updateState(ac);
  }

  // async removeAccessControl(ac){
  //   return this.updateState(ad)
  // }
}

module.exports = AccessControlList;
