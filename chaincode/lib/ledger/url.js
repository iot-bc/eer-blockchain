/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:41
 * @Filename: url.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

class UniformResourceLocator extends State {
  constructor(obj) {
    super(UniformResourceLocator.getClass(), [obj.owner, obj.device]);
    Object.assign(this, obj);
  }

  getDevice() {
    return this.device;
  }

  setDevice(device) {
    this.device = device;
  }

  getOwner() {
    return this.owner;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  activiate() {
    this.currentState = true;
  }

  drop() {
    this.currentState = false;
  }

  static fromBuffer(buffer) {
    return UniformResourceLocator.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, UniformResourceLocator);
  }

  static createInstance(owner, device, url) {
    return new UniformResourceLocator({ owner, device, url });
  }

  static getClass() {
    return "org.eer.url";
  }
}

module.exports = UniformResourceLocator;
