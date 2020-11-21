import s from './NavPage.module.css'
import {NavLink} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import TocOutlinedIcon from '@material-ui/icons/TocOutlined'

const pages = [
    {to: '/main', title: 'Главная', icon: <HomeIcon/>},
    {to: '/add', title: 'Новый урок', icon: <AddIcon/>},
    {to: '/lessons', title: 'Занятия', icon: <TocOutlinedIcon/>},
]

const NavPage = ()=>{
    return(
        <div className={s.navWrapper}>
            <div className={s.content}>
                <div className={s.contentBlocks}>
                    {pages.map((item, idx)=>{
                        return(
                            <NavLink className={s.contentItem} key={idx} to={item.to} activeClassName={s.active}>
                                {/*<div className={s.icon}>*/}
                                    {item.icon}
                                {/*</div>*/}
                                <div className={s.title} >{item.title}</div>
                                {/*<div className={s.}></div>*/}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NavPage