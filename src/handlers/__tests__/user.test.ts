import * as user from "../user";

describe("user handler", () => {
  it("should do something when something happens", () => {
    expect(1).toBe(1);
  });
});

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "hello", password: "hi" } };
    const res = {
      json({ token }: { token: string }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
