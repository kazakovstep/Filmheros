import React, {useEffect, useState} from "react";
import {withAdvertLayout} from "../../Layout/AdvertLayout/AdvertLayout";
import styles from "../../style/Advert.module.css"
import {Logo} from "../../components/Logo/Logo";
import cn from "classnames";
import {H} from "../../components/Htag/Htag";
import HStyle from "../../components/Htag/Htag.module.css"
import {Input} from "../../components/Input/Input";
import {File} from "../../components/File/File";
import {Select} from "../../components/Select/Select";
import {Textarea} from "../../components/Textarea/Textarea";
import {Badge} from "../../components/Badge/Badge";
import {Checkbox} from "../../components/Checkbox/Checkbox";
import {Button} from "../../components/Button/Button";
import PStyle from "../../components/Input/Input.module.css"
import {useAddArticleMutation} from "../../redux/api/article.api";

export const tags = {
    "Мужчина": "Male",
    "Женщина": "Female",
    "Существо": "Animal",
};

export const categories = {
    "Супегерои": "Superheroes",
    "Персонажи боевиков": "Action",
    "Персонажи комедии": "Comedy",
    "Персонажи детективов": "Detective",
    "Персонажи ужасов": "Horror",
    "Персонажи фантастики": "Fantasy"
};

interface AdditionalForm {
    fact: string;
    description: string;
}

interface DataModel {
    id?: number;
    heroName: string;
    heroDesc: string;
    actorName: string;
    filmYear: string;
    filmName: string;
    actorPic: string;
    heroPics: string[];
    facts: { fact: string; description: string }[];
    selectedCategories: string,
    selectedTags: string,
    importantFact: { fact: string; description: string }[]

}

export const Advert = () => {


    const [heroNameState, setHeroNameState] = useState("default");
    const [heroDescState, setHeroDescState] = useState("default");
    const [actorNameState, setActorNameState] = useState("default");
    const [filmNameState, setFilmNameState] = useState("default");
    const [filmYearState, setFilmYearState] = useState("default");

    const [tagsValid, setTagsValid] = useState(false);
    const [categoriesValid, setCategoriesValid] = useState(false);

    const [heroPicEmpty, setHeroPicEmpty] = useState(false);
    const [actorPicEmpty, setActorPicEmpty] = useState(false);

    const [selectedTags, setSelectedTags] = useState("");
    const [selectedCategories, setSelectedCategories] = useState("");

    const [actorPicture, setActorPicture] = useState("");
    const [heroPictures, setHeroPictures] = useState([]);


    const [FormEmpty, setFormEmpty] = useState(false);

    const [additionalForms, setAdditionalForms] = useState([]);
////////////////////////контент страницы//////////////////////////////
    const [heroName, setHeroName] = useState("");
    const [heroDesc, setHeroDesc] = useState("");
    const [actorName, setActorName] = useState("");
    const [filmYear, setFilmYear] = useState("");
    const [filmName, setFilmName] = useState("");

    const handleAddLink = () => {
        setAdditionalForms((prevForms: AdditionalForm[]) => [
            ...prevForms,
            {fact: "", description: "", state: "default"}
        ]);
    };

    const handleBadgeChangeTags = (value: string) => {
        if (selectedTags === value) {
            setSelectedTags("");
        } else {
            setSelectedTags(value);
        }
    };

    const handleBadgeChangeCategories = (value: string) => {
        if (selectedCategories === value) {
            setSelectedCategories("");
        } else {
            setSelectedCategories(value);
        }
    };

    useEffect(() => {
        if (selectedTags === "") {
            setTagsValid(false);
        } else {
            setTagsValid(true);
        }

        if (selectedCategories === "") {
            setCategoriesValid(false);
        } else {
            setCategoriesValid(true);
        }
    }, [selectedTags, selectedCategories]);

    const [addArticle, {isLoading, isSuccess, isError, data, error}] = useAddArticleMutation();

    const handleNext = () => {
        const heroName = document.querySelector('input[placeholder="Имя киногероя"]')?.value;
        const heroDesc = document.querySelector('textarea[placeholder="Краткое описание персонажа"]')?.value;
        const actorName = document.querySelector('input[placeholder="Имя актера/актрисы"]')?.value;
        const filmYear = document.querySelector('input[placeholder="Год выхода фильма"]')?.value;
        const filmName = document.querySelector('textarea[placeholder="Название фильма"]')?.value;

        setHeroName(heroName);
        setHeroDesc(heroDesc);
        setActorName(actorName);
        setFilmYear(filmYear);
        setFilmName(filmName);

        if (heroName === "") {
            setHeroNameState("error-filled");
        } else {
            setHeroNameState("default");
        }
        if (heroDesc === "") {
            setHeroDescState("error-filled");
        } else {
            setHeroDescState("default");
        }
        if (actorName === "") {
            setActorNameState("error-filled");
        } else {
            setActorNameState("default");
        }
        if (filmYear === "") {
            setFilmYearState("error-filled");
        } else {
            setFilmYearState("default");
        }
        if (filmName === "") {
            setFilmNameState("error-filled");
        } else {
            setFilmNameState("default");
        }

        const heroPics = document.querySelectorAll('input[type="file"]')[0];
        const actorPic = document.querySelectorAll('input[type="file"]')[1];

        const heroFiles = Array.from(heroPics?.files || []);
        const actorFile = actorPic?.files?.[0];

        if (heroFiles.length === 0) {
            setHeroPicEmpty(true);
        } else {
            setHeroPicEmpty(false);
        }

        if (!actorFile) {
            setActorPicEmpty(true);
        } else {
            setActorPicEmpty(false);
        }

        const factInputs = document.querySelectorAll('input');
        let fact = "";
        let description = "";
        let isFilled = false;

        const facts: {
            fact: string;
            description: string;
        }[] = [];

        let importantFact = {
            fact,
            description
        };

        factInputs.forEach((input, index) => {
            if (input.placeholder === "Факт") {
                const important = factInputs[index - 1];
                const factInput = factInputs[index];
                const descInput = factInputs[index + 1];

                if (factInput && descInput && factInput.value !== "" && descInput.value !== "") {
                    if (important.checked) {
                        fact = factInput.value;
                        description = descInput.value;
                        importantFact = {fact, description};
                        fact = "";
                        description = "";
                        setFormEmpty(false);
                        isFilled = true;
                    } else {
                        fact = factInput.value;
                        description = descInput.value;
                        facts.push({fact, description});
                        fact = "";
                        description = "";
                        setFormEmpty(false);
                        isFilled = true;
                    }
                }
            }
        });

        if (!isFilled) {
            setFormEmpty(true);
        }
        const logoReader = new FileReader();
        logoReader.readAsDataURL(actorFile ? actorFile : new Blob());
        logoReader.onloadend = () => {
            let actorPic = logoReader.result;
            if (actorPic === "data:application/octet-stream;base64,") {
                actorPic = actorPicture;
                setActorPicEmpty(false)
            }
            const heroFilesPromises = heroFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        const base64 = reader.result;
                        resolve(base64);
                    };
                    reader.onerror = reject;
                });
            });
            Promise.all(heroFilesPromises).then(async (results) => {
                let heroPics = results;
                if (heroPics.length === 0) {
                    heroPics = heroPictures;
                    setHeroPicEmpty(false);
                }
                const newData = {
                    heroName,
                    heroDesc,
                    actorName,
                    filmYear,
                    filmName,
                    selectedTags,
                    selectedCategories,
                    importantFact,
                    heroPics: heroPics.map((heroPic) => heroPic.substring(heroPic.indexOf(",") + 1)),
                    actorPic: actorPic.substring(actorPic.indexOf(",") + 1),
                    facts
                };
                if (
                    heroName !== "" && heroDesc !== "" && actorName !== "" && filmYear !== "" && filmName !== "" &&
                    categoriesValid && tagsValid && !actorPicEmpty && !heroPicEmpty && !FormEmpty
                ) {
                    await addArticle(newData);
                    window.location.href = "/catalog"
                }
            });
        };
    }


    return (
        <>
            <Logo className={styles.logo}/>
            <div className={styles.input_form_ver}>
                <H type={"h2"} className={cn(styles.title, HStyle.h2)}>
                    О ком вы хотите рассказать?
                </H>
                <H type={"body"} className={cn(styles.text, HStyle.body)}>
                    Заполните анкету, чтобы поделиться с тысячами ценителей кино
                </H>
                <div className={styles.input_container}>
                    <Input
                        state={heroNameState}
                        type={"text"}
                        placeholder={"Имя киногероя"}
                        hint={"Например, Халк"}
                        label={"Имя киногероя"}
                        value={heroName}
                    />
                </div>
                <div className={styles.input_container}>
                    <Textarea
                        state={heroDescState}
                        type={"text"}
                        placeholder={"Краткое описание персонажа"}
                        hint={"Например, Халк представляет собой альтер-эго Брюса Бэннера, который стал высокоэнергетическим громадином после неудачного эксперимента с гамма-радиацией...."}
                        label={"Описание"}
                        value={heroDesc}
                    />
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Выберите пол персонажа</H>
                    <div className={cn(styles.badge_list)}>
                        {Object.keys(tags).map((tagKey, index) => (
                            <Badge key={index} type="tag"
                                   checked={selectedTags === tags[tagKey]}
                                   onChange={() => handleBadgeChangeTags(tags[tagKey])}
                            >
                                {tagKey}
                            </Badge>
                        ))}
                    </div>
                    {tagsValid ? null : <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо сделать выбор</p>}
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Как выглядит персонаж?</H>
                    <H type={"caption"}>Выберите не более 3 изображений</H>
                    <File many={true} valueMany={heroPictures}/>
                    {heroPicEmpty ?
                        <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо выбрать изображение</p> : null}
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Кто играл/озвучивал персонажа?</H>
                    <Input
                        state={actorNameState}
                        type={"text"}
                        placeholder={"Имя актера/актрисы"}
                        hint={"Например, Том Круз"}
                        label={"Имя актера/актрисы"}
                        value={actorName}
                    />
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Как выглядит актер/актриса?</H>
                    <H type={"caption"}>Выберите 1 изображение</H>
                    <File many={false} valueSolo={actorPicture}/>
                    {actorPicEmpty ?
                        <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо выбрать изображение</p> : null}
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>О каком фильме вы хотите рассказать?</H>
                    <div className={styles.film_form}>
                        <Select state={filmYearState} placeholder={"Год выхода фильма"} hint={"Год выхода фильма"}
                                className={styles.select} value={filmYear}>
                            <option value={"2023"}>2023</option>
                            <option value={"2022"}>2022</option>
                            <option value={"2021"}>2021</option>
                            <option value={"2020"}>2020</option>
                            <option value={"2019"}>2019</option>
                            <option value={"2018"}>2018</option>
                            <option value={"2017"}>2017</option>
                            <option value={"2016"}>2016</option>
                            <option value={"2015"}>2015</option>
                            <option value={"2014"}>2014</option>
                            <option value={"2013"}>2013</option>
                            <option value={"2012"}>2012</option>
                            <option value={"2011"}>2011</option>
                            <option value={"2010"}>2010</option>
                            <option value={"2009"}>2009</option>
                            <option value={"2008"}>2008</option>
                            <option value={"2007"}>2007</option>
                            <option value={"2006"}>2006</option>
                            <option value={"2005"}>2005</option>
                            <option value={"2004"}>2004</option>
                            <option value={"2003"}>2003</option>
                            <option value={"2002"}>2002</option>
                            <option value={"2001"}>2001</option>
                            <option value={"2000"}>2000</option>
                        </Select>
                        <Textarea
                            className={styles.textarea}
                            state={filmNameState}
                            type={"text"}
                            placeholder={"Название фильма"}
                            hint={"Например, Мстители"}
                            label={"Название фильма"}
                            value={filmName}
                        />
                    </div>
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Выберите категорию фильма</H>
                    <div className={cn(styles.badge_list)}>
                        {Object.keys(categories).map((categoryKey, index) => (
                            <Badge key={index} type="category"
                                   checked={selectedCategories === categories[categoryKey]}
                                   onChange={() => handleBadgeChangeCategories(categories[categoryKey])}
                            >
                                {categoryKey}
                            </Badge>
                        ))}
                    </div>
                    {categoriesValid ? null :
                        <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо сделать выбор</p>}
                </div>
                <div className={styles.input_container}>
                    <H type={"body-bold"}>Интересные факты</H>
                    <H type={"caption"}>Напишите интеречные факты и выберите самый интересный из них</H>
                    <div className={styles.checkbox_form}>
                        <Checkbox form={"circle"} id={"checkbox"}/>
                        <Input
                            state={"default"}
                            type={"text"}
                            placeholder={"Факт"}
                            label={"Факт"}
                        />
                        <Input
                            state={"default"}
                            type={"text"}
                            placeholder={"Суть факта"}
                            label={"Суть факта"}
                        />
                    </div>
                    {additionalForms.map(() => (
                        <div className={styles.checkbox_form}>
                            <Checkbox form={"circle"} id={"checkbox"}/>
                            <Input
                                state={"default"}
                                type={"text"}
                                placeholder={"Факт"}
                                label={"Факт"}
                            />
                            <Input
                                state={"default"}
                                type={"text"}
                                placeholder={"Суть факта"}
                                label={"Суть факта"}
                            />
                        </div>
                    ))}
                    {FormEmpty ?
                        <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо написать/выбрать хотя бы один
                            факт</p> : null}
                    <div className={styles.addbuttonBlock}>
                        <p></p>
                        <p></p>
                        <Button type={"text"} state={"default"} onClick={handleAddLink} className={styles.addbutton}>Добавить
                            факт</Button>
                    </div>
                </div>
                <div className={styles.pubbutton}>
                    <Button state={"default"} type={"primary"} onClick={handleNext}>Опубликовать</Button>
                </div>
            </div>
        </>
    );
}

export default withAdvertLayout(Advert);
