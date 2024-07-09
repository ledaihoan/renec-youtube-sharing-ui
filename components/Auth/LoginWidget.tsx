import { useEffect, useState } from 'react';
import { Button, Group, TextInput, Tooltip } from '@mantine/core';
import _ from 'lodash';

import { useMutation } from '@tanstack/react-query';
import { isValidEmail, isValidPassword } from '@/utils/text-utils';
import { LoginData } from '@/types/login-data.';

const emailMessage = 'You must enter a valid email';
const passwordMessage = 'Password must start with ' +
  'character, include 1 uppercase, 1 lowercase, 1 number, and 1 special character';

export type LoginWidgetProps = {
  loginUser: (data: LoginData) => Promise<void>;
  registerUser: (data: LoginData) => Promise<void>;
};

export default function LoginWidget({ loginUser, registerUser }: LoginWidgetProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const reset = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => reset(),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => reset(),
  });

  useEffect(() => {
    const isValid = email === '' || isValidEmail(email);
    setEmailError(isValid ? '' : emailMessage);
  }, [email]);
  useEffect(() => {
    if (!password) {
      return setPasswordError('You must enter a valid password');
    }
    if (password.length < 8) {
      return setPasswordError('Password must be at least 8 characters');
    }
    const isValid = isValidPassword(password);
    return setPasswordError(isValid ? '' : passwordMessage);
  }, [password]);

  return (
    <Group>
      <Tooltip label={emailError} position="bottom" opened={!!emailError}>
        <TextInput placeholder="Email" onChange={(event) => setEmail(event.currentTarget.value)} size="sm" />
      </Tooltip>
      <Tooltip label={passwordError} position="bottom" opened={email !== '' && !emailError && !!passwordError}>
        <TextInput placeholder="Password" type="password" onChange={(event) => setPassword(event.currentTarget.value)} size="sm" />
      </Tooltip>
      <Button
        disabled={
          _.isEmpty(email) || _.isEmpty(password)
          || !_.isEmpty(passwordError) || !_.isEmpty(emailError)
        }
        loading={loginMutation.isPending || registerMutation.isPending}
        size="sm"
        onClick={() => loginMutation.mutate({ email, password })}
      >Login
      </Button>
      <Button
        disabled={
          _.isEmpty(email) || _.isEmpty(password)
          || !_.isEmpty(passwordError) || !_.isEmpty(emailError)
        }
        loading={loginMutation.isPending || registerMutation.isPending}
        size="sm"
        onClick={() => registerMutation.mutate({ email, password })}
      >Register
      </Button>
    </Group>
  );
}
