import {Typography, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import s from './HeaderPage.module.css'
import MenuProfile from "./menuProfile/MenuProfile";
import LinearProgress from "@material-ui/core/LinearProgress";


const HeaderPage = ({loading}) => {

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
                {!loading && <div className='progressLine'>
                    <LinearProgress/>
                </div>}
            </AppBar>

        </div>
    )
}

export default HeaderPage