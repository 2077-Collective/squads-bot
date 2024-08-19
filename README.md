# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Backend API

GET /squads

```js
[
  {
    name: "Squad #18: Bounties & Tasks Bot + Frontend",
    leadName: "_lynett", // discord username of lead
    guilds: ["marketing", "bd"],
    threadId: "1275141851422396446", // id of thread
    status: "inprogress", // planning | inprogress | complete | locked
    type: "ephemeral", // ephemeral | permanent
    creationTimestamp: 0, // unix timestamp. as you can see, squad 18 was created at the beginning of time
    lastInteractionTimestamp: 1724100410, // unix timestamp of last activity
  },
];
```

GET /tasks

```js
[
  {
    name: "Assassinate Emmanuel Awosika",
    description: "blah blah assassination blah blah lorem ipsum",
    threadId: "1275141851422396446", // id of thread
    guilds: ["dev"],
    xp: 10,
    createdBy: "_lynett",
    isActive: true,
    endTimestamp: 1724100410,
    creationTimestamp: 0, // unix timestamp. as you can see, this task was created at the beginning of time
  },
];
```
