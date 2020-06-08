/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/6/3 下午3:52
 * @Filename: key.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class Key extends State {

  constructor(obj) {
    super(Key.getClass(), ["KEY", obj.id]);
    Object.assign(this, obj);
  }

  getID() {
    return this.id;
  }

  setID(id) {
    this.id = id;
  }

  getSecret() {
    return this.secret;
  }

  setSecret(secret) {
    this.secret = secret;
  }

  static fromBuffer(buffer) {
    return Key.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, Key);
  }

  static createInstance(id, secret) {
    return new Key({id, secret});
  }

  static getClass() {
    return "org.eer.key";
  }

}

module.exports = Key;
