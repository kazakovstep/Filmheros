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

  const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const [additionalForms, setAdditionalForms] = useState([]);

    const handleAddLink = () => {
    const newFormId = additionalForms.length + 1;
    setAdditionalForms((prevForms: AdditionalForm[]) => [
      ...prevForms,
      { type: "", contact: "", state: "default"}
    ]);
  };

    const handleBadgeChangeTags = (value: string) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((item) => item !== value));
    } else {
      if (selectedTags.length < 2) {
        setSelectedTags([...selectedTags, value]);
      }
    }
  };

    const handleBadgeChangeCategories = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      if (selectedCategories.length < 2) {
        setSelectedCategories([...selectedCategories, value]);
      }
    }
  };


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
                  state={"default"}
                  type={"text"}
                  placeholder={"Имя киногероя"}
                  hint={"Например, Халк"}
                  label={"Имя киногероя"}
                />
            </div>
            <div className={styles.input_container}>
               <Input
                  state={"default"}
                  type={"text"}
                  placeholder={"Краткое описание персонажа"}
                  hint={"Например, Халк представляет собой альтер-эго Брюса Бэннера, который стал высокоэнергетическим громадином после неудачного эксперимента с гамма-радиацией...."}
                  label={"Описание"}
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
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Как выглядит персонаж?</H>
                <H type={"caption"}>Выберите не более 5 изображений</H>
                <File many={true}/>
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Кто играл/озвучивал персонажа?</H>
                <Input
                  state={"default"}
                  type={"text"}
                  placeholder={"Имя актера/актрисы"}
                  hint={"Например, Том Круз"}
                  label={"Имя актера/актрисы"}
                />
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>Как выглядит актер/актриса?</H>
                <H type={"caption"}>Выберите 1 изображение</H>
                <File many={false}/>
            </div>
            <div className={styles.input_container}>
                <H type={"body-bold"}>О каком фильме вы хотите рассказать?</H>
                <div className={styles.film_form}>
                    <Select state={"default"} placeholder={"Год выхода фильма"} hint={"Год выхода фильма"} className={styles.select}>
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
                      state={"default"}
                      type={"text"}
                      placeholder={"Название фильма"}
                      hint={"Например, Мстители"}
                      label={"Название фильма"}
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
                    <Textarea
                      state={"default"}
                      type={"text"}
                      placeholder={"Суть факта"}
                      label={"Суть факта"}
                    />
                </div>
                <div className={styles.checkbox_form}>
                    <Checkbox form={"circle"}/>
                    <Input
                      state={"default"}
                      type={"text"}
                      placeholder={"Факт"}
                      label={"Факт"}
                    />
                    <Textarea
                      state={"default"}
                      type={"text"}
                      placeholder={"Суть факта"}
                      label={"Суть факта"}
                    />
                </div>
                {additionalForms.map((form, index) => (
          <div className={styles.checkbox_form}>
                    <Checkbox form={"circle"}/>
                    <Input
                      state={"default"}
                      type={"text"}
                      placeholder={"Факт"}
                      label={"Факт"}
                    />
                    <Textarea
                      state={"default"}
                      type={"text"}
                      placeholder={"Суть факта"}
                      label={"Суть факта"}
                    />
                </div>
        ))}
                <div className={styles.addbutton}>
                    <Button type={"text"} state={"default"} onClick={handleAddLink}>Добавить факт</Button>
                </div>
            </div>
            <div className={styles.pubbutton}>
                <Button state={"default"} type={"primary"}>Опубликовать</Button>
            </div>

        </div>
    </>
  );
}

export default withAdvertLayout(Advert);
