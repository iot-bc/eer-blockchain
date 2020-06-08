/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:52
 * @Filename: keyList.js
 * @Function: do nothing >_>
 */

const StateList = require("./state/stateList");

const Key = require("./key");

class KeyList extends StateList {
  constructor(ctx) {
    super(ctx, "org.eer.keylist");
    this.use(Key);
  }

  async addKey(key) {
    return this.addState(key);
  }

  async getKey(keyKey) {
    return this.getState(keyKey);
  }

  async updateKey(key) {
    return this.updateState(key);
  }

  async deleteKey(keyKey) {
    return this.deleteState(keyKey);
  }

}

module.exports = KeyList;
