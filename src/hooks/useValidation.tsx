import {ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

export const useValidation = (titles: string) =>{
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const isDisable = useMemo(() => {
    return !(isEmail && isPassword);
  }, [isEmail, isPassword]) 

  useEffect(() => {
    if (titles) {
      setIsEmail(false);
      setIsPassword(false);
    }
  }, [titles])

  const changeEmailData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const EMAIL_CHECK = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const check = EMAIL_CHECK.test(e.currentTarget.value);
    if (check) setIsEmail(true);
    else if (!check && isEmail) setIsEmail(false); 
  }, [isEmail]);

  const changePasswordData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const check = e.currentTarget.value.length > 7;
    if (check) setIsPassword(true);
    else if (!check && isPassword) setIsPassword(false);
  }, [isPassword]);

  return [isEmail, isPassword, isDisable, changeEmailData, changePasswordData] as const
}
