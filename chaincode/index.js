/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/28 下午11:39
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const Acl = require("./lib/acContract");
const Url = require("./lib/urlContract");
const Key = require("./lib/keyContract");
const ID = require("./lib/idContract");

module.exports.Acl = Acl;
module.exports.Url = Url;
module.exports.ID = ID;
module.exports.Key = Key;
module.exports.contracts = [Acl, Url, ID, Key];
