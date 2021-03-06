/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:33
 * @Filename: urlContract.js
 * @Function: do nothing >_>
 */

const {Contract, Context} = require("fabric-contract-api");

const Url = require("./ledger/url");
const UrlList = require("./ledger/urlList");

class UniformResourceLocatorContext extends Context {
  constructor() {
    super();

    this.urlList = new UrlList(this);
  }
}

class UniformResourceLocatorContract extends Contract {
  constructor() {
    super("org.eer.url");
  }

  createContext() {
    return new UniformResourceLocatorContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the Url Contract");
  }

  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger ===========");
    // initLedger
    console.info("=============  END : Initialize Ledger  ===========");
  }


  async getUrl(ctx, owner, device) {
    let urlKey = makeUrlKey(owner, device);
    let _url = await ctx.urlList.getUrl(urlKey);

    if (_url) return _url.getUrl();
    else return false;
  }

  async addUrl(ctx, owner, device, url) {

    if (await ctx.urlList.getUrl(makeUrlKey(owner, device))) {
      return false;
    }

    let _url = Url.createInstance(owner, device, url);
    await ctx.urlList.addUrl(_url);

    return _url;
  }

  async updateUrl(ctx, owner, device, url) {
    let urlKey = makeUrlKey(owner, device);
    let _url = await ctx.urlList.getUrl(urlKey);

    if (_url) {
      _url.setUrl(url);
      await ctx.urlList.updateUrl(_url);
      return _url.getUrl();
    } else return false;
  }

  async deleteUrl(ctx, owner, device) {
    let urlKey = makeUrlKey(owner, device);
    let _url = await ctx.urlList.getUrl(urlKey);

    if (_url) {
      await ctx.urlList.deleteUrl(urlKey);
      return _url.getUrl();
    } else return false;
  }

  // async ...
}

function makeUrlKey(owner, device) {
  return Url.makeKey([owner, device]);
}

module.exports = UniformResourceLocatorContract;
