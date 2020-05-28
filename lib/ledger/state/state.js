/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:34
 * @Filename: state.js
 * @Function: do nothing >_>
 */

class State {
  constructor(stateClass, keyParts) {
    this.class = stateClass;
    this.key = State.makeKey(keyParts);
    this.currentState = null;
  }

  getClass() {
    return this.class;
  }

  getKey() {
    return this.key;
  }

  getSplitKey() {
    return State.splitKey(this.key);
  }

  getCurrentState() {
    return this.currentState;
  }

  serialize() {
    return State.serialize(this);
  }

  static serialize(object) {
    return Buffer.from(JSON.stringify(object));
  }

  static deserialize(data, supportedClasses) {
    let json = JSON.parse(data.toString());
    let objClass = supportedClasses[json.class];
    if (!objClass) {
      throw new Error(`Unknown class of ${json.class}`);
    }
    let object = new objClass(json);

    return object;
  }

  static deserializeClass(data, objClass) {
    let json = JSON.parse(data.toString());
    let object = new objClass(json);
    return object;
  }

  static makeKey(keyParts) {
    return keyParts.map(part => JSON.stringify(part)).join(":");
  }

  static splitKey(key) {
    return key.split(":");
  }
}

module.exports = State;
