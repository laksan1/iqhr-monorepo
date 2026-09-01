import RootRoutes from './routes/RootRoutes';
import { Providers, ReactEffects } from './services';

const App = () => (
  <Providers>
    <ReactEffects />
    <RootRoutes />
  </Providers>
);

export default App;
