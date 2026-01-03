import type { UserConfig } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", "sentence-case"],
    "header-max-length": [2, "always", 72],
    "type-case": [2, "always", "lower-case"],
  },
} satisfies UserConfig;
