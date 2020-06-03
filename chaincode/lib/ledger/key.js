/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:52
 * @Filename: key.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class Key extends State {

  constructor(obj) {
    super(Key.getClass(), []);
    Object.assign(this, obj);
  }

  /// ////


  static fromBuffer(buffer) {
    return Key.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, Key);
  }

  // todo
  static createInstance() {
    return new Key({});
  }

  static getClass() {
    return "org.eer.key";
  }

}

module.exports = Key;
