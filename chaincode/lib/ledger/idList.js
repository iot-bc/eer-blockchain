/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:53
 * @Filename: idList.js
 * @Function: do nothing >_>
 */

const StateList = require("./state/stateList");

const Identity = require("./id");

class IdentityList extends StateList {
  constructor(ctx) {
    super(ctx, "org.eer.idlist");
    this.use(Identity);
  }

  async addIdentity(id) {
    return this.addState(id);
  }

  async getIdentity(idKey) {
    return this.getState(idKey);
  }

  async updateIdentity(id) {
    return this.updateState(id);
  }

  async deleteIdentity(idKey) {
    return this.deleteState(idKey);
  }

}

module.exports = IdentityList;
