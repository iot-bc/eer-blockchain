/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:34
 * @Filename: stateList.js
 * @Function: do nothing >_>
 */
const State = require("./state");

class StateList {
  /**
   * Store Fabric context for subsequent API access, and name of list
   */
  constructor(ctx, listName) {
    this.ctx = ctx;
    this.name = listName;
    this.supportedClasses = {};
  }

  async addState(state) {
    let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
    let data = State.serialize(state);
    await this.ctx.stub.putState(key, data);
  }

  async getState(key) {
    let ledgerKey = this.ctx.stub.createCompositeKey(
      this.name,
      State.splitKey(key)
    );
    let data = await this.ctx.stub.getState(ledgerKey);
    if (data && data.toString("utf8")) {
      return State.deserialize(data, this.supportedClasses);
    } else {
      return null;
    }
  }

  async getValidState(key) {
    return null;
  }

  async updateState(state) {
    let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
    let data = State.serialize(state);
    await this.ctx.stub.putState(key, data);
  }

  /** Stores the class for future deserialization */
  use(stateClass) {
    this.supportedClasses[stateClass.getClass()] = stateClass;
  }
}

module.exports = StateList;
