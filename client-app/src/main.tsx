import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom';
import { store, storeContext } from './app/stores/Store.ts'
import { router } from './app/router/routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <storeContext.Provider value={store}>
      <RouterProvider router={router}></RouterProvider>
    </storeContext.Provider>
  </StrictMode>,
)
