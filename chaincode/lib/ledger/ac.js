/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:42
 * @Filename: ac.js
 * @Function: do nothing >_>
 */

const State = require("./state/state");

const ACROLE = {
  OWNER: "OWNER",
  TEACHER: "TEACHER",
  ELSE: "ELSE"
};

class AccessControl extends State {
  constructor(obj) {
    super(AccessControl.getClass(), [obj.subject, obj.object]);
    Object.assign(this, obj);
  }

  // user
  getSubject() {
    return this.subject;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  // device
  getObject() {
    return this.object;
  }

  setObject(object) {
    this.object = object;
  }

  // right
  getOperation() {
    return this.operation;
  }

  setOperation(op) {
    this.operation = op;
  }

  // role

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  // addRole(role) {
  //   if (!this.rule.split(" ").contains(role)) {
  //     this.role += ` ${role}`;
  //     this.role.trim();
  //   }
  // }
  //
  // removeRole(role) {
  //   let roles = this.role.split(" ");
  //   if (roles.indexOf(role) > -1) roles.splice(roles.indexOf(role), 1);
  //   this.role = roles.join(" ");
  // }
  //
  // checkAC(role) {
  //   return this.rule.split(" ").indexOf(role) > -1;
  // }

  activiate() {
    this.currentState = true;
  }

  drop() {
    this.currentState = false;
  }

  static fromBuffer(buffer) {
    return AccessControl.deserialize(buffer);
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  static deserialize(data) {
    return State.deserializeClass(data, AccessControl);
  }

  static createInstance(subject, object, operation, role) {
    return new AccessControl({ subject, object, operation, role });
  }

  static getClass() {
    return "org.eer.ac";
  }
}

module.exports = AccessControl;
