import React, { ChangeEvent, FC } from "react";

type TAuthForm = {
    loginOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    loginVal: string;
    passwordOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    passwordVal: string;
};

export const AuthForm: FC<TAuthForm> = ({ loginOnChange, loginVal, passwordOnChange, passwordVal }) => {
    return (
        <div>
            <input
                id="login"
                name="login"
                type="text"
                required
                placeholder="Логин"
                onChange={loginOnChange}
                value={loginVal}
                minLength={5}
                className="inp form-elem-size"
            />
            <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Пароль"
                onChange={passwordOnChange}
                value={passwordVal}
                className="inp form-elem-size mt-4"
            />
        </div>
    );
};
