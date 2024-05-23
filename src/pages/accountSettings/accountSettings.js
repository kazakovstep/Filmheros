import React, {useEffect, useState} from 'react';
import styles from '../../style/AccountSettings.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {Input} from "../../components/Input/Input";
import {H} from "../../components/Htag/Htag";
import {Button} from "../../components/Button/Button";
import {useGetCurrentUserQuery, useUpdateUserMutation} from "../../redux/api/user.api";

const AccountSettings = () => {
    const {data} = useGetCurrentUserQuery();
    const [updateUser] = useUpdateUserMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        setUsername(data?.username);
        setEmail(data?.email);
        setPhoto(data?.photo);
    }, [data]);

    const handleSave = async () => {
        const user = {
            userName: username,
            email,
            oldPassword: oldPassword || undefined,
            newPassword: newPassword || undefined,
            photo
        };

        await updateUser(user);
    };

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const changeLogo = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let logo = document.getElementsByClassName('logo')[0];
            logo.style.backgroundImage = `url(${e.target.result})`;
        };
        setPhoto(reader.readAsDataURL(file));
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type="h2">
                    Здесь вы можете изменить настройки аккаунта
                </H>
            </div>
            <div className={styles.inputContainer}>
                <div style={{cursor: "pointer"}}>
                    <div className="logo" onClick={triggerFileInput}></div>
                    <input
                        id="fileInput"
                        className={styles.hiddenInput}
                        type="file"
                        accept="image/*"
                        onChange={changeLogo}
                    />
                </div>
                <Input
                    placeholder="Имя пользователя"
                    label="Изменить имя пользователя"
                    state="default"
                    type="text"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                />
                <Input
                    placeholder="ivanov@mail.ru"
                    label="Изменить электронную почту"
                    state="default"
                    type="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                />
                <Input
                    placeholder="Старый пароль"
                    label="Изменить пароль"
                    state="default"
                    type="password"
                    value={oldPassword}
                    onChange={handleInputChange(setOldPassword)}
                />
                <Input
                    placeholder="Новый пароль"
                    label="Изменить пароль"
                    state="default"
                    type="password"
                    value={newPassword}
                    onChange={handleInputChange(setNewPassword)}
                />
                <Button
                    state="default"
                    type="primary"
                    className={styles.btn}
                    onClick={handleSave}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default withAccountLayout(AccountSettings);