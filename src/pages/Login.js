import React, {useEffect, useState} from "react";
import {withAuthLayout} from "../Layout/AuthLayout/AuthLayout";
import styles from "../style/Login.module.css";
import cn from "classnames";
import {H} from "../components/Htag/Htag";
import Htag from "../components/Htag/Htag.module.css";
import {Input} from "../components/Input/Input";
import button from "../components/Button/Button.module.css";
import {Button} from "../components/Button/Button";
import {Logo} from "../components/Logo/Logo";
import {Link} from "react-router-dom";
import {useLoginMutation} from "../redux/api/auth.api";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailState, setEmailState] = useState("default");
    const [passwordState, setPasswordState] = useState("default");
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);

    const [login, {isLoading, isSuccess, isError, data, error}] = useLoginMutation();

    const handleLogin = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$/;

        if (emailRegex.test(email)) {
            setEmailState("default");
            setEmailValid(true);
        } else {
            setEmailState("error-filled");
            setEmailValid(false);
        }

        if (passwordRegex.test(password)) {
            setPasswordState("default");
            setPasswordValid(true);
        } else {
            setPasswordState("error-filled");
            setPasswordValid(false);
        }

        if (emailRegex.test(email) && passwordRegex.test(password)) {
            try {
                const user = JSON.stringify({email, password});
                await login(user).unwrap();
            } catch (err) {
                console.error('Failed to login user: ', err);
            }
        }
    };

    useEffect(() => {
        if (isError) {
            setEmail("");
            setPassword("");
            setPasswordState("default");
            setEmailState("default");
        }
        if(isSuccess){
            window.location.href = "/catalog"
        }
    }, [isError, isSuccess]);

    return (
        <>
            <div className={cn(styles.auth)}>
                <Logo className={styles.logo}/>
                <H type={"h2"} className={cn(styles.title, Htag.h2)}>
                    Вход в аккаунт
                </H>
                <div className={cn(styles.form)}>
                    <H type={"body"}
                       className={cn(styles.error, Htag.body)}>{isError ? "Пользователя не существует" : null}</H>
                    <Input
                        type={"email"}
                        state={emailState}
                        label={"E-mail"}
                        placeholder={"E-mail"}
                        value={email}
                        hint={isEmailValid ? "" : "Неверный электронный адрес"}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                    <Input
                        type={"password"}
                        state={passwordState}
                        label={"Пароль"}
                        placeholder={"Пароль"}
                        value={password}
                        hint={isPasswordValid ? "Верхний/нижний регистр, цифры, спец.знак, 8 символов" : "Неверный пароль"}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Input>
                    <Button
                        state={"default"}
                        type={"primary"}
                        onClick={handleLogin}
                        className={cn(
                            styles.form_item_button,
                            button.default,
                            button.primary,
                            button.button
                        )}
                    >
                        Войти
                    </Button>
                    <div className={styles.after_list}>
                        <H type={"body"} className={cn(styles.list_text, Htag.body)}>
                            Ещё нет аккаунта?
                        </H>
                        <Link to={"/register"}>
                            <Button type={"text"}>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.button_forget}>
                        <Link to={"/password_reset"}>
                            <Button type={"text"}>
                                Забыли пароль?
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuthLayout(Login);
