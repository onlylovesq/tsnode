## npx

npm 的一个新的命令 以前如果想执行一个命令的话需要全局安装
以前: npm install create-react-app -g 然后 create-react-app test
现在: npx create-react-app test
npx 会默认帮你安装 create-react-app 然后使用它 用完了就自动删除

## 创建 tsconfig.json

一般会用 tsc --init 这个命令去创建, 但是这个命令创建出来的 tsconfig.json 配置文件比较简陋很多配置需要我们自己去配置

我们可以用 npx tsconfig.json 这个命令去创建 选择你想要创建的项目类型 它会给你创建比较完善的配置信息

## 启动项目命令

```
  "start": "cross-env PORT=8000 ts-node-dev --respawan ./src/bin/www.ts"

  cross-env 设置环境变量 因为在mac window linux设置环境变量的命令不同 所以用cross-env来设置

  ts-node-dev 启动编译
  --respawan 监听源文件变化 变化了重新编译
  ./src/bin/www.ts 指定文件


  "dev": "cross-env PORT=8000 nodemon --exec ts-node --files ./src/bin/www.ts"

  --exec 执行
  ts-node 用来解析es6语法 import export
  --files 指定文件
```

## sequelize

> Sequelize 是一个基于 promise 的 Node.js ORM,目前支持 Postgresql,MySQL,SQLite 和 Microsoft SQL Server。 它具有强大的事务支持,关联关系,预读和延迟加载,读取复制等功能

## docker-compose

> 可以同时启动多个镜像
