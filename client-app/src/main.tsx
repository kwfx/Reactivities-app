import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import { store, storeContext } from './app/stores/Store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <storeContext.Provider value={store}>
      <App />
    </storeContext.Provider>
  </StrictMode>,
)
