import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);

