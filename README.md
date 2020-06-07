# eer-blockchain

## 启动

```shell script
# 1
cd eer-network

# sudo ./
bash eer.sh [options]  
    # up
    # createChannel
    # init (== up createChannel)
    # deployEER 将合约打包成链码部署，包含了(package, install, queryInstalled, approve, checkCommitReadiness, commit definitions, queryCommitted, invoke)
        # 此步骤一旦完成则意味链码已完全部署成功，下面跑deployTest即可
    # down

# 不需要指定 -l, 已默认node环境
```

采用fabric-ca颁发证书密钥，couchdb作为账本的状态数据库，node/js作为合约的语言环境

## 测试

/tests下

```shell script
bash cp.sh

node addWallet.js

node testUrl.js

node xxx.js

```
