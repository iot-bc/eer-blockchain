/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:53
 * @Filename: id.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class Identity extends State {

  constructor(obj) {
    super(Identity.getClass(), []);
    Object.assign(this, obj);
  }

  // ///


  static fromBuffer(buffer) {
    return Identity.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, Identity);
  }

  static createInstance(...args) {
    // todo
    return new Identity({...args});
  }

  static getClass() {
    return "org.eer.id";
  }
}

module.exports=Identity;
