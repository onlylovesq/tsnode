import { Sequelize } from "sequelize";
const sequelize = new Sequelize("api", "root", "123456", {
  host: "db",
  // 一套代码走天下,一套代码对应所有的数据 sqlServer oracle mysql mariadb postgresql
  dialect: "mysql", // 你要使用哪种数据库
  logging: false // 我们不再用写SQL语句
});

export { sequelize };
