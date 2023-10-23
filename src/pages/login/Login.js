import React, {useEffect} from "react";
import { withAuthLayout } from "../../Layout/AuthLayout/AuthLayout";
import styles from "../../style/Login.module.css";
import cn from "classnames";
import { H } from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import { Input } from "../../components/Input/Input";
import button from "../../components/Button/Button.module.css";
import { Button } from "../../components/Button/Button";
import {Logo} from "../../components/Logo/Logo";
import {Link} from "react-router-dom";

export const Login = () => {
useEffect(() => {
    const squares = Array.from(
      document.querySelectorAll(`.${styles.square}`)
    );
    const squares1 = Array.from(
      document.querySelectorAll(`.${styles.square1}`)
    );

    squares.forEach((square) => {
      const randomTop = getRandomValueInRange(0, 90);
      const randomLeft = getRandomValueInRange(0, 90);

      square.style.top = `${randomTop}%`;
      square.style.left = `${randomLeft}%`;
    });
    squares1.forEach((squaress) => {
      const randomTop1 = getRandomValueInRange(0, 90);
      const randomLeft1 = getRandomValueInRange(0, 90);

      squaress.style.top = `${randomTop1}%`;
      squaress.style.left = `${randomLeft1}%`;
    });
  }, []);

  function getRandomValueInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <>
      <div className={cn(styles.auth)}>
        <Logo/>
        <H type={"h2"} className={cn(styles.title, Htag.h2)}>
          Вход в аккаунт
        </H>
        <div className={cn(styles.form)}>
          <Input
              type={"email"}
            className={cn(styles.input)}
            state={"default"}
            label={"E-mail"}
            placeholder={"E-mail"}
          ></Input>
          <Input
              type={"password"}
            className={cn(styles.input)}
            state={"default"}
            label={"Пароль"}
            placeholder={"Пароль"}
          ></Input>
          <Button
            state={"default"}
            type={"primary"}
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
              <Button state={"default"} type={"text"}>
                Зарегистрироваться
              </Button>
            </Link>
          </div>
          <div className={styles.button_forget}>
            <Link to={"/password_reset"}>
            <Button state={"default"} type={"text"}>
                Забыли пароль?
              </Button>
            </Link>
          </div>
          <div className={styles.square}></div>
          <div className={styles.square1}></div>
          <div className={styles.square1}></div>
          <div className={styles.square}></div>
          <div className={styles.square1}></div>
          <div className={styles.square}></div>
          <div className={styles.square1}></div>
          <div className={styles.square}></div>
        </div>
      </div>
    </>
  );
}

export default withAuthLayout(Login);
