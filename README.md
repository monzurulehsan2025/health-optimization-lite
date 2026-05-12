# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Sample Requests and Responses

### 1. Health Score
**Request:**
`GET /api/health-score`

**Response:**
```json
{
  "currentScore": 85,
  "history": [
    {"name": "Jan", "score": 72},
    {"name": "Feb", "score": 75},
    {"name": "Mar", "score": 78},
    {"name": "Apr", "score": 76},
    {"name": "May", "score": 82},
    {"name": "Jun", "score": 85}
  ]
}
```

### 2. Biomarkers
**Request:**
`GET /api/biomarkers`

**Response:**
```json
[
  {"id": 1, "name": "LDL Cholesterol", "value": "95 mg/dL", "status": "optimal", "change": "-12%"},
  {"id": 2, "name": "HbA1c", "value": "5.2 %", "status": "optimal", "change": "-0.1%"},
  {"id": 3, "name": "Vitamin D", "value": "28 ng/mL", "status": "warning", "change": "+2%"},
  {"id": 4, "name": "ApoB", "value": "88 mg/dL", "status": "warning", "change": "+5%"}
]
```

### 3. Action Items
**Request:**
`GET /api/action-items`

**Response:**
```json
{
  "title": "Schedule your DEXA scan",
  "description": "Your last body composition analysis was over 12 months ago."
}
```
