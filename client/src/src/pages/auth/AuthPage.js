import {useState} from "react";
import s from './AuthPage.module.css'
import SwitchItem from './SwitchItem/SwitchItem';
import BlockContentItem from "./BlockContentItem/BlockContentItem";

const AuthPage = () => {
    const [switchBtn, setSwitchBtn] = useState(true)
    const blockSwitchItem = ['Регистрация', 'Вход']


    return (
        <div className={s.wrapper}>
            <div className={s.block__wrapper}>
                <div className={s.block}>
                    <div className={s.blockSwitch}>

                        {blockSwitchItem.map((el) => {
                            return <SwitchItem text={el} setSwitchBtn={setSwitchBtn} switchBtn={switchBtn}/>
                        })}

                    </div>
                    <div className={s.blockContent}>

                        <BlockContentItem switchBtn={switchBtn}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage