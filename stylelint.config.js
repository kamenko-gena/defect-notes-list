module.exports = {
    plugins: ["stylelint-less"],
    rules: {
        "color-named": "never",
        "declaration-empty-line-before": "never",
        "rule-empty-line-before": "always",
        "no-duplicate-selectors": true,
        "no-descending-specificity": true
      }
  };