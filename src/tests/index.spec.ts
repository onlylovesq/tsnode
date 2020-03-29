import app from "../app";
import chai, { expect } from "chai";

describe("index", () => {
  it("GET / 访问首页", async () => {
    const result = await chai.request(app).get("/");

    expect(result).to.have.status(200); // 期望返回200的状态码
    expect(result.body).to.have.property("success");
    expect(result.body.success).to.equal(true);
    expect(result.body).to.have.property("data");
  });
});
