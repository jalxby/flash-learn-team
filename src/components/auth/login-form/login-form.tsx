import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { loginFormSchema } from './login-form-schema.ts'
import s from './login-form.module.scss'

import { ControlledCheckbox, ControlledTextField, Typography } from '@/components'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Form = z.infer<typeof loginFormSchema>
type LoginFormPropsType = {
  onSubmit: (data: Form) => void
}
export const LoginForm: FC<LoginFormPropsType> = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<Form>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
  })

  // eslint-disable-next-line no-console
  const onSubmitForm = handleSubmit(data => {
    onSubmit({ email: data.email, password: data.password, rememberMe: data.rememberMe })
    reset({
      email: '',
      password: '',
      rememberMe: false,
    })
  })

  return (
    <Card className={s.card}>
      <Typography variant="large" as={'h1'} className={s.title}>
        Sign in
      </Typography>
      <form onSubmit={onSubmitForm}>
        <ControlledTextField
          name={'email'}
          control={control}
          inputType={'text'}
          title={'Login'}
          containerProps={{ className: s.textField }}
        />
        <ControlledTextField
          name={'password'}
          control={control}
          inputType={'password'}
          title={'Password'}
          containerProps={{ className: s.textField }}
        />
        <ControlledCheckbox
          label={'Remember me'}
          name={'rememberMe'}
          control={control}
          left={true}
          className={s.checkbox}
        />

        <Typography variant="body2" as={'a'} href={'/forgot_password'} className={s.forgotPassword}>
          Forgot password?
        </Typography>

        <Button type={'submit'} fullWidth={true}>
          Sign In
        </Button>
      </form>
      <div className={s.formFooter}>
        <Typography variant="body2" className={s.noAccount}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>

        <Typography as={'a'} href={'/sign-up'} className={s.signUp}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
