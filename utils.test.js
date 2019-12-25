const utils = require("./utils");
describe("处理语雀markdown内容", () => {
  test("dropTitle", () => {
    const str =
      '# 年中杂想\n\n<a name="tvcEE"></a>\n## 前言\n有两个月没写总结了';

    expect(utils.dropTitle(str)).toBe("## 前言\n有两个月没写总结了");
  });

  test("dropAnchor", () => {
    const str = '开源\n\n<a name="CIXKx"></a>\n### 全局';

    expect(utils.dropAnchor(str)).toBe("开源\n\n### 全局");
  });

  test("replaceBrWithNewline", () => {
    const str = "相关脑图如下：<br />![image.png]";

    expect(utils.replaceBrWithNewline(str)).toBe(
      "相关脑图如下：\n![image.png]"
    );
  });

  test("getYuqueSlug", () => {
    const url = "https://www.yuque.com/levy/blog/hygs5d";
    const slug = "hygs5d";

    expect(utils.getYuqueSlug(url)).toBe(slug);
    expect(utils.getYuqueSlug(url + "?a=b")).toBe(slug);
    expect(utils.getYuqueSlug(url + "#a=b")).toBe(slug);
    expect(
      utils.getYuqueSlug(
        "https://www.yuque.com/deepexi-serverless/component-ulh7va/lgloen"
      )
    ).toBe("lgloen");
  });
});
