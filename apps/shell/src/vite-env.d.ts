/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module 'candidates/App' {
  import type { ComponentType } from 'react';

  const App: ComponentType;
  export default App;
}

declare module 'vacancies/App' {
  import type { ComponentType } from 'react';

  const App: ComponentType;
  export default App;
}

declare module 'personal-account/App' {
  import type { ComponentType } from 'react';

  const App: ComponentType;
  export default App;
}
