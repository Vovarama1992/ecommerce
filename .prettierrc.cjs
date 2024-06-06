module.exports = {
   trailingComma: 'es5',
   semi: false,
   singleQuote: true,
   endOfLine: 'auto',
   printWidth: 100,
   requirePragma: true,
   arrowParens: 'avoid',
   overrides: [
      {
         files: '{**/*,*}.{js,ts,jsx,tsx,vue,astro,cjs,mjs,css,scss,html,json}',
         excludeFiles: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/coverage/**',
            '**/public/**',
            '**/*.d.ts',
            '**/deployment/**',
         ],
         options: { requirePragma: false },
      },
   ],
}