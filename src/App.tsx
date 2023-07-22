import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components'
import { CheckEmailPage, Decks, SignIn, SignUp } from '@/pages'
import { ForgotPasswordPage } from '@/pages/forgot-password'
import { UpdatePasswordPage } from '@/pages/update-password'
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
        index: true,
        element: (
          <ProtectedRoutes>
            <Decks />
          </ProtectedRoutes>
        ),
      },

      {
        path: 'forgot_password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password/:token',
        element: <UpdatePasswordPage />,
      },

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
