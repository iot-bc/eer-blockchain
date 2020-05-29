/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:33
 * @Filename: urlContract.js
 * @Function: do nothing >_>
 */

const { Contract, Context } = require("fabric-contract-api");

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
    console.log("Instantiate the AccessControl Contract");
  }

  async initLedger(ctx){
    console.log("++++ init url ledger ++++ ")
    const urls = [
      {
        owner: "1",
        device: "1-1",
        url:"123"
      },
      {
        owner: "2",
        device: "2-1",
        url:"1eee23"
      },
      {
        owner: "3",
        device: "3-1",
        url:"122223"
      },
    ];
    for(let i=0;i<urls.length;i++){
      await ctx.stub.putState("URL"+i, Buffer.from(JSON.stringify(urls[i])))
      console.info('Added <--> ', urls[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryUrls(ctx) {
    const startKey = 'URL0';
    const endKey = 'URL999';
    const allResults = [];
    for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
      const strValue = Buffer.from(value).toString('utf8');
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    console.info(allResults);
    return JSON.stringify(allResults);
  }

  async addUrl(ctx, owner, device, url) {
    let _url = Url.createInstance(owner, device, url);

    _url.activiate();

    await ctx.urlList.addUrl(_url);

    return _url;
  }

  async updateUrl(ctx, owner, device, url) {
    let urlKey = Url.makeKey([owner, device]);
    let _url = await ctx.urlList.getUrl(urlKey);

    if (_url) {
      _url.setUrl(url);
      await ctx.urlList.updateUrl(_url);
    }
    return _url;
  }

  async deleteUrl(ctx, owner, device) {
    let urlKey = Url.makeKey([owner, device]);
    let _url = await ctx.urlList.getUrl(urlKey);

    if (_url) {
      _url.drop();
      await ctx.urlList.updateUrl(_url);
    }
    return _url;
  }

  // async ...
}

module.exports = UniformResourceLocatorContract;
