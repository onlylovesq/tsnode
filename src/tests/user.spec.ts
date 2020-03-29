import app from "../app";
import chai, { expect } from "chai";

describe("测试用户的restful接口", () => {
  it("POST /users 添加用户", async () => {
    const result = await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "zhangsan",
        password: "123456",
        email: "zhangsan@qq.com"
      });
    expect(result).to.have.status(200); // 期望返回200的状态码
    expect(result.body).to.have.property("success");
    expect(result.body.success).to.equal(true);
    expect(result.body).to.have.property("data");
    expect(result.body.data.id).to.equal(1);
  });

  it("GET /users 查看所有用户", async () => {
    await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "zhangsan",
        password: "123456",
        email: "zhangsan@qq.com"
      });

    await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "lisi",
        password: "123456",
        email: "zhangsan@qq.com"
      });

    const result = await chai.request(app).get("/users");

    expect(result).to.have.status(200); // 期望返回200的状态码
    expect(result.body.success).to.equal(true);
    expect(result.body.data).to.have.lengthOf(2);
  });

  it("PUT /users/:id 更新用户", async () => {
    const result = await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "zhangsan",
        password: "123456",
        email: "zhangsan@qq.com"
      });

    await chai
      .request(app)
      .put(`/users/${result.body.data.id}`)
      .set("Content-Type", "application/json")
      .send({
        username: "lisi2",
        password: "654321",
        email: "lisi2@qq.com"
      });

    const result3 = await chai
      .request(app)
      .get(`/users/${result.body.data.id}`);

    expect(result3).to.have.status(200); // 期望返回200的状态码
    expect(result3.body.success).to.equal(true);
    expect(result3.body.data.username).to.equal("lisi2");
    expect(result3.body.data.password).to.equal("654321");
    expect(result3.body.data.email).to.equal("lisi2@qq.com");
  });

  it("DELETE /users/:id 删除用户", async () => {
    await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "zhangsan",
        password: "123456",
        email: "zhangsan@qq.com"
      });

    await chai
      .request(app)
      .post("/users") // 以POST方式请求/users路径
      .set("Content-Type", "application/json") // 设置请求头的类型
      .send({
        username: "zhangsan1",
        password: "123457",
        email: "zhangsan1@qq.com"
      });

    await chai.request(app).delete("/users/2");

    const result = await chai.request(app).get("/users");
    expect(result).to.have.status(200);
    expect(result.body.success).to.equal(true);
    expect(result.body.data).to.have.lengthOf(1);
  });
});
