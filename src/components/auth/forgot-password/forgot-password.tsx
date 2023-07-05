import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { ControlledTextField, Typography } from '@/components'
import { forgotPasswordSchema } from '@/components/auth/forgot-password/forgot-password-schema.ts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Form = z.infer<typeof forgotPasswordSchema>
export const ForgotPassword: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
  })

  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit(data => {
    console.log('login-form', data)
    reset({
      email: '',
    })
  })

  // eslint-disable-next-line no-console
  console.log(errors)

  return (
    <Card className={s.card}>
      <Typography variant="large" as={'h1'} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={onSubmit}>
        <ControlledTextField
          name={'email'}
          control={control}
          inputType={'text'}
          title={'Email'}
          containerProps={{ className: s.textField }}
        />
        <Typography variant="body2" className={s.description}>
          Enter your email address and we will send you further instructions
        </Typography>

        <Button type={'submit'} fullWidth={true}>
          Send Instructions
        </Button>
      </form>
      <div className={s.formFooter}>
        <Typography variant="body2" className={s.rememberPassword}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Did you remember your password?
        </Typography>

        <Typography as={'a'} href={'/login'} className={s.link}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}