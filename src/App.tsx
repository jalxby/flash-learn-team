import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components'
import { CheckEmailPage, Packs, SignIn, SignUp } from '@/pages'
import { ForgotPasswordPage } from '@/pages/forgot-password'
import { ProtectedRoutes } from '@/protected-routes.tsx'

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
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'packs',
        element: (
          <ProtectedRoutes navigateTo={'/sign-in'}>
            <Packs />
          </ProtectedRoutes>
        ),
      },

      {
        path: 'forgot_password',
        element: <ForgotPasswordPage />,
      },
      // {
      //   path: 'cards/:deckId',
      //   element: <Cards />,
      // },

      {
        path: 'check-email',
        element: <CheckEmailPage />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
