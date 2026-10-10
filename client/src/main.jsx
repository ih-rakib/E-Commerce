import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
