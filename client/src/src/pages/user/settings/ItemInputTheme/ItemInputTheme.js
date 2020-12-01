import s from './ItemInputTheme.module.css';
import {TextField, withStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";


const ItemInputTheme = ()=>{

    const CssTextField = withStyles({
        root: {
            width: '100%',
            '& input':{
              color: '#f2f2f2'
            },
            '& label.MuiFormLabel-root': {
                color: '#F2F2F27D'
            },
            '& label.Mui-focused': {
                color: '#F2F2F259',
            },
            '& .MuiInput-underline::before': {
                borderBottomColor: '#F2F2F259',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#f2f2f2',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled)::before':{
                borderBottomColor: '#F2F2F259',
            },
            '& div':{
                '& .MuiTypography-colorTextSecondary':{
                    color: '#F2F2F259',
                }
            }
        },
    })(TextField);



    return(
        <div className={s.themeInputs}>
                <CssTextField
                    label="Тема"
                    defaultValue={'sdsdsds'}
                    style={{ marginRight: '40px' }}
                    onChange={(e)=>{
                        console.log(e)
                    }}
                />
                <CssTextField
                    label="Цена за час"
                    defaultValue={'sadsads'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">&#8381;</InputAdornment>,
                    }}
                    style={{ width: '20%' }}
                    aria-describedby="filled-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
        </div>
    )
}

export default ItemInputTheme