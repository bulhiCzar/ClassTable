import {useContext, useEffect, useState} from "react"
import {useHttp} from "../../hooks/http.hooks"
import s from './AddPage.module.css'
import GD from '../../../GD'
import DataTime from "./selectors/dataTime/DataTime"
import FilledInput from "@material-ui/core/FilledInput";
import SelectCast from "./selectors/select/SelectCast";
import AsyncSelectCast from "./selectors/select/AsyncSelectCast";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AuthContext} from "../../context/AuthContext";
import {useToast} from "../../hooks/toast.hooks";
import {DataContext} from "../../context/DataContext";
import {connect} from "react-redux";
import {addLesson} from "../../../redux/actions";

const timeSelect = [
    {value: 1, label: '1 час'},
    {value: 1.5, label: '1.5 часа'},
    {value: 2, label: '2 часа'},
]

const AddPage = (props) => {
    const auth = useContext(AuthContext)
    const {reload} = useContext(DataContext)
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [multiplier, setMultiplier] = useState(1)
    const [clock, setClock] = useState('1 час')
    const [theme, setTheme] = useState('')
    const [teacher, setTeacher] = useState('')
    const [student, setStudent] = useState('')
    const [input, setInput] = useState('')
    const [dateCarrying, setDateCarrying] = useState(0)
    const [endPrice, setEndPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const {request} = useHttp()
    const {state} = GD()
    const headers = {authorization: `Bearer ${auth.token}`}
    const {setToast} = useToast()


    const getTeacher = async () => {
        const options = []
        const res = await request(`${state.SERVER.url}/api/user/teacher`, 'POST', {}, headers)
        options.push({value: res.teacher, label: res.teacher})
        return options
    }
    const getStudent = async () => {
        const options = []
        const res = await request(`${state.SERVER.url}/api/user/students`, 'POST', {}, headers)
        res.students.forEach((item) => {
            options.push({value: item, label: item})
        })
        return options
    }


    useEffect(() => {
        const end = price * multiplier
        setEndPrice(end)
    }, [price, multiplier])

    const changeThemes = (e) => {
        setPrice(e.price)
        setTheme(e.value)
    }
    const changedHold = (e) => {
        setMultiplier(e.value)
        setClock(e.label)
    }
    const changedTimes = (e) => {
        if (!e) {
            setTime(null)
            return
        }
        const date = e._d.toJSON().slice(0, 10).replace(':', '-').split('-').reverse().join('.').slice(0, 5)
        // const time = e._d.toJSON().slice(11, 16)
        const time = e._d.toString().slice(16, 21)
        setDateCarrying(Date.parse(e._d))
        setTime(time)
        setDate(date)
    }
    const changedTeacher = (e) => {
        setTeacher(e.value)
    }
    const changedStudent = (e) => {
        setStudent(e.value)
    }

    const pressAdd = async ()=>{
        if (!dateCarrying || !theme || !student || !teacher){
            setToast({m: "Заполните все поля", type: "warning"})
            return
        }
        const lesson = {
            student,
            teacher,
            price,
            dateCarrying,
            comment: input,
            topic: theme,
            multiplier
        }
        console.log(lesson)
        const res = await request(`${state.SERVER.url}/api/lesson/add`, 'POST', lesson, headers)
        setToast(res)

        if (res.type === 'success') {
            props.addLesson(lesson)
        }
        // reload()
    }




    const defaultMaterialTheme = createMuiTheme({
        overrides: {
            MuiFilledInput: {
                input: {
                    padding: '20px 2px 10px'
                },
                underline: {
                    '&::after': {
                        borderColor: '#F2F2F27D;',
                    },
                    '&::before': {
                        borderColor: '#404040;'
                    },
                    '&:hover:not(.Mui-disabled)::before': {
                        borderColor: '#404040',
                    }
                },
                root: {
                    color: '#F2F2F2',
                    width: '100%',
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },

                },
                Mui: {
                    focused: {
                        backgroundColor: 'transparent',
                    }
                }
            },
            MuiInputBase: {
                input: {
                    fontSize: '16px',
                    '&::placeholder': {
                        color: '#F2F2F27D',
                        opacity: 1,
                        transition: 'none'
                    },
                }
            }
        },
    })
    const btnStyle = makeStyles({
        root: {
            borderRadius: '0px',
            width: '100%',
            height: '100%',
            color: '#F2F2F2',
            backgroundColor: '#34343487',
            transition: '.5s',
            '&:hover': {
                backgroundColor: '#333232'
            },
            '& span': {
                alignItems: 'center',
                height: '100%',
                fontSize: '18px',
            },
            MuiButton:{

                label: {backgroundColor: 'red'}

            }
        },
    });
    const classes = btnStyle();
    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                <div className={s.title}>
                    <div className={s.titleText}>
                        Добавление занятия
                    </div>
                    <div className={`${s.titleText} ${s.blockPrice}`}>
                        {endPrice} &#8381;
                    </div>
                </div>
                <div className={s.main}>
                    <div className={s.selectors}>
                        <AsyncSelectCast
                            title={'Студент'}
                            onChange={changedStudent}
                            loadOptions={getStudent}
                            placeholder={"Выбрать"}
                        />
                        <AsyncSelectCast
                            title={'Учитель'}
                            onChange={changedTeacher}
                            loadOptions={getTeacher}
                            placeholder={"Выбрать"}
                        />
                        <DataTime
                            title={'Дата и время'}
                            changedTimes={changedTimes}
                        />
                        <SelectCast
                            options={state.LEARN.themes}
                            onChange={changeThemes}
                            placeholder={"Выбрать"}
                            title={"Тема"}
                        />
                        <SelectCast
                            options={timeSelect}
                            onChange={changedHold}
                            defaultValue={timeSelect[0]}
                            placeholder={""}
                            title={"Длительность"}
                        />
                    </div>
                    <div className={s.selectors}>
                        <div className={s.inputComment}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <FilledInput
                                    label="Standard"
                                    position="start"
                                    placeholder={'Комментарий'}
                                    value={input}
                                    onChange={(e)=>{setInput(e.target.value)}}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={s.btnAdd}>
                            <Button className={classes.root} onClick={pressAdd}>Добавить</Button>
                        </div>
                    </div>
                    <div className={s.constructor}>
                        <div className={s.cblock}>
                            <div className={s.cblockItems}>
                                <div className={s.cLabel}>Ученик</div>
                                <div className={s.cText}>
                                    <div>{student}</div>
                                </div>
                            </div>
                            <div className={s.cblockItems}>
                                <div className={s.cLabel}>Учитель</div>
                                <div className={s.cText}>{teacher}</div>
                            </div>
                            <div className={s.cblockItems}>
                                <div className={`${s.cLabel} ${s.cLabelTwo}`}>
                                    <div>Дата</div>
                                    <div>Время</div>
                                </div>
                                <div className={`${s.cText} ${s.cDateTime}`}>
                                    <div className={s.left}>{date}</div>
                                    <div className={s.right}>{time}</div>
                                </div>
                            </div>
                            <div className={s.cblockItems}>
                                <div className={s.cLabel}>Тема</div>
                                <div className={s.cText}>{theme}</div>
                            </div>
                            <div className={s.cblockItems}>
                                <div className={s.cLabel}>Длительность</div>
                                <div className={s.cText}>{clock}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default connect(null, {addLesson})(AddPage)