/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:53
 * @Filename: id.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class Identity extends State {

  constructor(obj) {
    super(Identity.getClass(), ["ID", obj.fakeID]);
    Object.assign(this, obj);
  }

  // ///

  setRealID(id) {
    this.realID = id;
  }

  getRealID() {
    return this.realID
  }

  setFakeID(id) {
    this.fakeID = id;
  }

  getFakeID() {
    return this.fakeID
  }


  static fromBuffer(buffer) {
    return Identity.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, Identity);
  }

  static createInstance(realID, fakeID) {
    // todo
    return new Identity({realID, fakeID});
  }

  static getClass() {
    return "org.eer.id";
  }
}

module.exports = Identity;
