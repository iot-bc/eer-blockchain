/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:42
 * @Filename: urlList.js
 * @Function: do nothing >_>
 */

const StateList = require("./state/stateList");

const UniformResourceLocator = require("./url");

class UniformResourceLocatorList extends StateList {
  constructor(ctx) {
    super(ctx, "org.eer.urllist");
    this.use(UniformResourceLocator);
  }

  async addUrl(url) {
    return this.addState(url);
  }

  async getUrl(urlKey) {
    return this.getState(urlKey);
  }

  async updateUrl(url) {
    return this.updateState(url);
  }

  async deleteUrl(urlKey) {
    return this.deleteState(urlKey);
  }

  // async removeUrl(url){
  //   return this.updateState()
  // }
}

module.exports = UniformResourceLocatorList;
