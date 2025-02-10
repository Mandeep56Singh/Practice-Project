import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
// In your existing config array:
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      
      // Core ESLint rules (for JS files)
      "no-unused-vars": "off", // Disable base rule
      
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "error", // Make this an error
        { 
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    ignores: ["dist/**"],
  },
];

