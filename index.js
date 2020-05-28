/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/28 下午11:39
 * @Filename: index.js
 * @Function: do nothing >_>
 */

const Acl = require("./lib/acContract")
const Url = require("./lib/urlContract")

module.exports.Acl= Acl;
module.exports.Url= Url;
module.exports.contracts = [ Acl,Url ];