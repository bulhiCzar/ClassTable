import s from "../HeaderPage.module.css";
import {MenuItem, Menu, IconButton} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import {AccountCircle} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import {AuthContext} from "../../../context/AuthContext";
import {useAuth} from "../../../hooks/auth.hooks";

const MenuProfile = () => {
    const {name, logout} = useContext(AuthContext)


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    const handleLogout = () => {
        handleClose()
        logout()
    }
    // console.log(name)

    const StyledMenuItem = withStyles({
        root: {
            // backgroundColor: "#754387",
            padding: '8px 18px',
            transition: 'background-color .4s ease-in',
            '&:hover':{
              backgroundColor: '#4D4D4D'
            },
        },
    })(MenuItem);


    return (
        <>
            <IconButton
                // aria-label="account of current user"
                aria-controls="menu-appbar"
                // aria-haspopup="true"
                className={s.persona}
                // onClick={()=>{(true)}}
                onClick={handleMenu}
                // color="inherit"
            >
                <div className={s.personaText}>{name}</div>
                <AccountCircle className={s.personaIcon}/>
            </IconButton>
            <Menu
                className={s.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                getContentAnchorEl={null}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        width: '130px',
                        borderRadius: '0px',
                        // paddingTop: '4px',
                        // paddingBottom: '4px',
                        padding: 0,
                        backgroundColor: '#3e3d3d',
                    }
                }}
                MenuListProps={{
                    style: {
                        padding: 0,
                        borderRadius: 'none',
                        color: '#F2F2F2',

                        '&active': {
                            color: '#494949'
                        }
                    },
                }}
                variant={'selectedMenu'}
                open={open}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleClose}>Profile</StyledMenuItem>
                <StyledMenuItem onClick={handleLogout}>Выйти</StyledMenuItem>
            </Menu>
        </>
    )
}

export default MenuProfile