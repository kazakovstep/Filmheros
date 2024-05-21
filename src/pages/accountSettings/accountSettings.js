import React from 'react';
import styles from '../../style/AccountSettings.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {Input} from "../../components/Input/Input";
import {H} from "../../components/Htag/Htag";
import {Button} from "../../components/Button/Button";

const AccountSettings = () => {

    function changeLogo(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            let logo = document.getElementsByClassName('logo')[0];
            logo.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file);
    }

    function triggerFileInput() {
        document.getElementById('fileInput').click();  // Программный клик по скрытому инпуту
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type={"h2"}>
                    Здесь вы можете изменить настройки аккаунта
                </H>
            </div>
            <div className={styles.inputsContainer}>
                <Input
                    placeholder={"Иван Иванов"}
                    label={"Изменить имя пользователя"}
                    state={"default"}
                    type={"text"}
                />
                <Input
                    placeholder={"ivanov@mail.ru"}
                    label={"Изменить электронную почту"}
                    state={"default"}
                    type={"email"}
                />
                <Input
                    placeholder={"password"}
                    label={"Изменить пароль"}
                    state={"default"}
                    type={"password"}
                />
                <div className={styles.profileLogo}>
                    <div className="logo" onClick={triggerFileInput}></div>
                    <input id="fileInput" className={styles.hiddenInput} type="file" accept="image/*" onChange={changeLogo}/>
                </div>
            </div>
            <Button
                state={"default"}
                type={"primary"}
                className={styles.btn}
            >
                Сохранить
            </Button>
        </div>
    );
};

export default withAccountLayout(AccountSettings);