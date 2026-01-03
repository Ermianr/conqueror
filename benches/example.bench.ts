import { bench, describe } from "vitest";

describe("Example Benchmarks", () => {
  bench("String concatenation", () => {
    let result = "";
    for (let i = 0; i < 1000; i++) {
      result += "test";
    }
  });

  bench("Array join", () => {
    const arr: string[] = [];
    for (let i = 0; i < 1000; i++) {
      arr.push("test");
    }
    arr.join("");
  });

  bench("Template literals", () => {
    let result = "";
    for (let i = 0; i < 1000; i++) {
      result = `${result}test`;
    }
  });
});
