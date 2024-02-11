'use client';

import { LoginButton, type LoginButtonProps } from '@telegram-auth/react';
import { signIn } from 'next-auth/react';

type Props = Pick<LoginButtonProps, 'botUsername'>;

export default function SignIn(props: Props) {
  return (
    <LoginButton
      botUsername={props.botUsername}
      onAuthCallback={(data) => signIn('telegram-login', { callback: '/' }, data as any)}
    />
  );
}
