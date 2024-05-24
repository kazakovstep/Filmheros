import React, {useEffect, useState} from 'react';
import styles from '../../style/AccountSettings.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {Input} from "../../components/Input/Input";
import {H} from "../../components/Htag/Htag";
import {Button} from "../../components/Button/Button";
import {useGetCurrentUserQuery, useUpdateUserMutation} from "../../redux/api/user.api";
import Exit from "../../images/exit.svg"
import ExitHover from "../../images/exit_hover.svg"
import {useLogoutMutation} from "../../redux/api/auth.api";

const AccountSettings = () => {
    const {data} = useGetCurrentUserQuery();
    const [updateUser] = useUpdateUserMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    useEffect(() => {
        setUsername(data?.userName);
        setEmail(data?.email);
    }, [data]);

    const [error, setError] = useState(false);

    const handleSave = async () => {
        const user = {
            userName: username,
            email,
            oldPassword: oldPassword || null,
            newPassword: newPassword || null,
            photo: avatr.substring(avatr.indexOf(",") + 1) || null
        };
        try {
            await updateUser(user).unwrap();
            setIsSuccess(true);
        } catch (err) {
            if (err.status === 401) {
                setError(true);
            } else {
                setError(false)
            }
        }
    };

    const [file, setFile] = useState("");

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/api/v1/image/${data?.photo}`, {
                method: "POST",
            }).then(response => response.blob())
                .then(data => {
                    const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                    setFile(URL.createObjectURL(file));
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }
    }, [data, data?.photo]);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const [avatr, setAvatr] = useState("");

    const changeLogo = (event) => {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setAvatr(e.target.result);
                let logo = document.getElementsByClassName('logo')[0];
                logo.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, error]);

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            if (error.status !== 403) {
                console.error("Произошла ошибка при разлогине:", error);
            }
        } finally {
            window.location.href = "/catalog";
        }
    };

    return (
        <div className={styles.container}>
            {isSuccess ?
                <div className={styles.success}>
                    <H type={"h3"}>СЭР, ВЫ ВОСХИТИТЕЛЬНЫ, СЭР</H>
                </div>
                : null}
            {error ?
                <div className={styles.error}>
                    <H type={"h3"}>СЭР, НИКАКИХ ИЗМЕНЕНИЙ, СЭР</H>
                </div>
                : null}
            <div className={styles.titleContainer}>
                <H type="h2">
                    Здесь вы можете изменить настройки аккаунта
                </H>
            </div>
            <div className={styles.inputContainer}>
                <div style={{cursor: "pointer"}}>
                    <div className="logo" onClick={triggerFileInput}>
                        <img src={file && !avatr ? file : avatr} alt={""} className={styles.avatr}/>
                    </div>
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
                <div style={{display: "flex", gap: "1rem"}}>
                    <Button
                        state="default"
                        type="primary"
                        className={styles.btn}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                    <Button
                        state="default"
                        type="primary"
                        className={styles.btn}
                        style={{width: "1rem"}}
                        onClick={handleLogout}
                        icon_url={Exit}
                        icon_url_hover={ExitHover}
                    >
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withAccountLayout(AccountSettings);