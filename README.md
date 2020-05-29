# eer-blockchain

```shell script
# 1
cd eer-network

# sudo ./
bash eer.sh [options]  
    # up
    # createChannel
    # up createChannel
    # deployEER 将合约打包成链码部署，包含了(package, install, queryInstalled, approve, checkCommitReadiness, commit definitions, queryCommitted, invoke)
        # 此步骤一旦完成则意味链码已完全部署成功，下面跑deployTest即可
    # deployTest 定义方法测试链码
    # down

# 不需要指定 -l, 已默认node环境
```

