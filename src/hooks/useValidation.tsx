import { useEffect, useState } from 'react';

interface EmailStatus {
  message: string;
  status: boolean;
}

interface PasswordStatus {
  message: string;
  status: boolean;
}

interface Target {
  email: string;
  password: string;
}

const useValidation = (target: Target): [EmailStatus, PasswordStatus] => {
  const { email, password } = target;

  const [emailStatus, setEmailStatus] = useState<EmailStatus>({
    message: '',
    status: false,
  });

  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>({
    message: '',
    status: false,
  });

  useEffect(() => {
    const emailValid = email.includes('@');

    if (!emailValid) {
      setEmailStatus({
        message: '이메일에 @를 포함시켜주세요.',
        status: false,
      });
    } else {
      setEmailStatus({
        message: '',
        status: true,
      });
    }
  }, [email]);

  useEffect(() => {
    const passwordValid = password.length > 7;

    if (!passwordValid) {
      setPasswordStatus({
        message: '비밀번호는 8자 이상이여야 합니다.',
        status: false,
      });
    } else {
      setPasswordStatus({
        message: '',
        status: true,
      });
    }
  }, [password]);

  return [emailStatus, passwordStatus];
};

export default useValidation;
