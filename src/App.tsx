import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Layout } from '@/components'
import { Packs, SignIn } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'packs',
        element: <Packs />,
      },
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
      // {
      //   path: 'cards/:deckId',
      //   element: <Cards />,
      // },
      // {
      //   path: 'sign-up',
      //   element: <SignUpPage />,
      // },
      // {
      //   path: 'profile',
      //   element: <Profile />,
      // },
    ],
  },
])

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
