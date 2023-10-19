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

const tags = [
  "Мужчина",
  "Женщина",
  "Существо",
];

const categories = [
  "Супегерои",
  "Персонажи боевиков",
  "Персонажи комедии",
  "Персонажи детективов",
  "Персонажи ужасов",
  "Персонажи фантастики"
];

interface AdditionalForm {
  fact: string;
  desc:string;
}
export const Advert = () => {
////////////////////////состояния//////////////////////////////
    const [heroNameState, setHeroNameState] = useState("default");
    const [heroDescState, setHeroDescState] = useState("default");
    const [actorNameState, setActorNameState] = useState("default");
    const [filmNameState, setFilmNameState] = useState("default");
    const [filmYearState, setFilmYearState] = useState("default");

    const [tagsValid, setTagsValid] = useState(false);
    const [categoriesValid, setCategoriesValid] = useState(false);

    const [heroPicEmpty, setHeroPicEmpty] = useState(false);
    const [actorPicEmpty, setActorPicEmpty] = useState(false);

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
    
   const [advert, setAdvert] = useState({
       heroName: "",
       heroDesc: "",
       actorName: "",
       filmYear: "",
       filmName: "",
       selectedCategories: "",
       selectedTags: "",
       heroPics: [],
       actorPic: "",
       facts: [],
       importantFact: []
    });

   useEffect(() => {
    if (
      heroName !== "" && heroDesc !== "" && actorName!=="" && filmYear!=="" && filmName!=="" &&
        categoriesValid && tagsValid && !heroPicEmpty && !actorPicEmpty && !FormEmpty
    ) {
      sessionStorage.setItem("advert", JSON.stringify(advert));
    }
  }, [heroName, heroDesc, actorName, filmYear, filmName, advert, categoriesValid, tagsValid, heroPicEmpty, actorPicEmpty, FormEmpty]);

   const [AdvertStorage, setAdvertStorage] = useState(advert);
   useEffect(() => {
      const storedAdvert = sessionStorage.getItem("advert");
        if (storedAdvert) {
          setAdvertStorage(JSON.parse(storedAdvert));
        }
   }, [advert])
    useEffect(() => {
    const choosenTags = AdvertStorage.selectedTags;
    const choosenCategories = AdvertStorage.selectedCategories;
    const actorpic = AdvertStorage.actorPic;
    const heropics = AdvertStorage.heroPics;
    setHeroPictures(heropics);
    setActorPicture(actorpic);
    setSelectedTags(choosenTags);
    setSelectedCategories(choosenCategories);
  }, [AdvertStorage]);

    const handleAddLink = () => {
    setAdditionalForms((prevForms: AdditionalForm[]) => [
      ...prevForms,
      { fact: "", desc: "", state: "default"}
    ]);
  };

    const handleBadgeChangeTags = (value: string) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((item) => item !== value));
    } else {
      if (selectedTags.length < 1) {
        setSelectedTags([...selectedTags, value]);
      }
    }
  };

    const handleBadgeChangeCategories = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      if (selectedCategories.length < 1) {
        setSelectedCategories([...selectedCategories, value]);
      }
    }
  };

    useEffect(() => {
        if(selectedTags.length === 0){
            setTagsValid(false);
        } else {
            setTagsValid(true);
        }
        if(selectedCategories.length === 0){
            setCategoriesValid(false);
        } else {
            setCategoriesValid(true);
        }
    }, [selectedTags, selectedCategories])

    const handleNext = () => {
        alert(actorPicture);

        const filmYear = document.querySelector('input[placeholder="Год выхода фильма"]')?.value;
        setFilmYear(filmYear);
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

    if (!actorFile && !actorPicture) {
        setActorPicEmpty(true);
    } else {
        setActorPicEmpty(false);
    }

    const factInputs = document.querySelectorAll('input');
    let fact = "";
    let desc = "";
    let isFilled = false;

    const facts: {
        fact: string;
        desc: string;
    }[] = [];

    const importantFact: {
        fact: string;
        desc: string;
    }[] = [];

    factInputs.forEach((input, index) => {
        if (input.placeholder === "Факт") {
            const important = factInputs[index - 1];
            const factInput = factInputs[index];
            const descInput = factInputs[index + 1];

            if (factInput && descInput && factInput.value !== "" && descInput.value !== "") {
                if (important.checked) {
                    fact = factInput.value;
                    desc = descInput.value;
                    importantFact.push({ fact, desc });
                    fact = "";
                    desc = "";
                    setFormEmpty(false);
                    isFilled = true;
                } else {
                    fact = factInput.value;
                    desc = descInput.value;
                    facts.push({ fact, desc });
                    fact = "";
                    desc = "";
                    setFormEmpty(false);
                    isFilled = true;
                }
            }
        }
    });

    if (!isFilled) {
        setFormEmpty(true);
    }
    if (actorFile) {
            const logoReader = new FileReader();
            logoReader.readAsDataURL(actorFile);
            logoReader.onloadend = () => {
                const actorPic = logoReader.result;

                const HerosFilesPromises = heroFiles.map((file) => {
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

                Promise.all(HerosFilesPromises).then((results) => {
                    const heroPics: string[] = results;

                    setAdvert({
                            heroName,
                            heroDesc,
                            actorName,
                            filmYear,
                            filmName,
                            selectedTags,
                            selectedCategories,
                            heroPics,
                            actorPic,
                            facts,
                            importantFact
                        })
                });
            };
        }
    }

  return (
    <>
        <Logo className={styles.logo}/>
        <div className={styles.input_form_ver}>
            <H type={"h2"} className={cn(styles.title,HStyle.h2)}>
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
                  value={AdvertStorage.heroName}
                  onChange={(el) => setHeroName(el.target.value)}
                />
            </div>
            <div className={styles.input_container}>
               <Textarea
                  state={heroDescState}
                  type={"text"}
                  placeholder={"Краткое описание персонажа"}
                  hint={"Например, Халк представляет собой альтер-эго Брюса Бэннера, который стал высокоэнергетическим громадином после неудачного эксперимента с гамма-радиацией...."}
                  label={"Описание"}
                  value={AdvertStorage.heroDesc}
                  onChange={(el) => setHeroDesc(el.target.value)}
                />
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Выберите пол персонажа</H>
                <div className={cn(styles.badge_list)}>
                  {tags.map((tag, index) => (
                                      <Badge key={index} type="tag"
                                             checked={selectedTags.includes(tag)}
                                             onChange={handleBadgeChangeTags}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                </div>
                {tagsValid ? null : <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо сделать выбор</p>}
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Как выглядит персонаж?</H>
                <H type={"caption"}>Выберите не более 3 изображений</H>
                <File many={true} valueMany={heroPictures}/>
                {heroPicEmpty ? <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо выбрать изображение</p> : null}
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Кто играл/озвучивал персонажа?</H>
                <Input
                  state={actorNameState}
                  type={"text"}
                  placeholder={"Имя актера/актрисы"}
                  hint={"Например, Том Круз"}
                  label={"Имя актера/актрисы"}
                  value={AdvertStorage.actorName}
                  onChange={(el) => setActorName(el.target.value)}
                />
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Как выглядит актер/актриса?</H>
                <H type={"caption"}>Выберите 1 изображение</H>
                <File many={false} valueSolo={actorPicture}/>
                {actorPicture ? null : <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо выбрать изображение</p>}
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>О каком фильме вы хотите рассказать?</H>
                <div className={styles.film_form}>
                    <Select state={filmYearState} placeholder={"Год выхода фильма"} hint={"Год выхода фильма"} className={styles.select} value={AdvertStorage.filmYear}>
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
                      state={filmNameState}
                      type={"text"}
                      placeholder={"Название фильма"}
                      hint={"Например, Мстители"}
                      label={"Название фильма"}
                      value={AdvertStorage.filmName}
                      onChange={(el) => setFilmName(el.target.value)}
                    />
                </div>
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Выберите категорию фильма</H>
                <div className={cn(styles.badge_list)}>
                  {categories.map((category, index) => (
                                      <Badge key={index} type="category"
                                             checked={selectedCategories.includes(category)}
                                             onChange={handleBadgeChangeCategories}
                                      >
                                        {category}
                                      </Badge>
                                    ))}
                </div>
                {categoriesValid ? null : <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо сделать выбор</p>}
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Интересные факты</H>
                <H type={"caption"}>Напишите интеречные факты и выберите самый интересный из них</H>
                <div className={styles.checkbox_form}>
                    <Checkbox form={"circle"}/>
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
                    <Checkbox form={"circle"}/>
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
                {FormEmpty ? <p className={cn(PStyle.p_error_filled, styles.p)}>Необходимо написать/выбрать хотя бы один факт</p> : null}
                <div className={styles.addbutton}>
                    <Button type={"text"} state={"default"} onClick={handleAddLink}>Добавить факт</Button>
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
