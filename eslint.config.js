import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig(
  // Global ignores
  globalIgnores([
    "dist",
    "node_modules",
    "coverage",
    ".git",
    "*.d.ts"
  ]),

  // Base JS config
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended
  },

  // TypeScript config
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        disallowTypeAnnotations: false
      }],
      "@typescript-eslint/no-import-type-side-effects": "error",

      // Override JS rules with TS-aware versions
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error"
    }
  },

  // Test files config
  {
    files: ["**/*.{spec,test}.{js,ts}", "**/tests/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  },

  // Example files config
  {
    files: ["examples/**/*"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
); 