import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { ModalProvider } from './apis/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<StrictMode>
    <ModalProvider>
        <App />
    </ModalProvider>
</StrictMode>);
