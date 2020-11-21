import {Typography, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import s from './HeaderPage.module.css'
import MenuProfile from "../nav/menuProfile/MenuProfile";


const HeaderPage = () => {



    return (
        <div className={s.root}>
            <AppBar position="static" className={s.appBar}>
                <Toolbar className={s.wrapper}>

                    <Typography className={s.title}>
                        Class Table
                    </Typography>

                    <div>
                        <MenuProfile/>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderPage