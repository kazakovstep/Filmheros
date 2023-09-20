import styles from './Checkbox.module.css';

export const Checkbox=({form, checked, onChange})=>{
    const handleCheckbox = (e) => {
        onChange && onChange(e.target.checked);
      };


    const handleRadio = (e) => {
        const targets: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
        targets.forEach((target) => {
            target.checked = false;
        });
        e.target.checked = true;
    }

    switch(form){
        case 'square':
            return <>
                <div className={styles.wrapper}>
                    <input className={styles.square} type="checkbox" checked={checked} onChange={handleCheckbox}/>
                </div>
            </>;
        case 'circle':
            return <>
                <div className={styles.wrapper}>
                    <input className={styles.circle} type="checkbox" checked={checked} onChange={handleRadio}/>
                </div>
            </>;
        default:
            return <></>;
    }
}