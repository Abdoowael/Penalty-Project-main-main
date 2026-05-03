import { AuthProvider } from '../context/AuthContext.jsx';
import { PlayersProvider } from '../context/PlayersContext.jsx';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <PlayersProvider>{children}</PlayersProvider>
    </AuthProvider>
  );
};

export default AppProviders;
