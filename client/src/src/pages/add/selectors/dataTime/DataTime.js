import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {useState} from "react";
import s from "../../AddPage.module.css";

const DataTime = ({changedTimes, title}) => {
    const [clearedDate, handleClearedDateChange] = useState(null)

    const defaultMaterialTheme = createMuiTheme({
        overrides: {
            MuiInput: {
                underline: {
                    '&::after': {
                        borderBottom: '2px solid #F2F2F27D;',
                    },
                    '&::before': {
                        borderBottom: '1px solid #404040;'
                    },
                    '&:hover:not(.Mui-disabled)::before':{
                        borderBottom: '1px solid #404040',
                    }
                },
            },
            MuiFormControl: {
                root: {
                    width: "100%",
                    height: "100%",
                    display: "inline-grid",
                },
            },
            MuiPickersYear: {
                root: {
                    '&:focus': {
                        color: "#C8C2B6",
                    }
                },
            },
            MuiInputBase: {
                input: {
                    color: '#F2F2F2 !important',
                    textAlign: "center"
                }
            },
            MuiPickersToolbar: {
                toolbar: {
                    backgroundColor: '#262626',
                },
            },
            MuiPickersCalendarHeader: {
                switchHeader: {
                    backgroundColor: "#262626",
                    // color: "rgba(256, 256, 256, 0.8)",
                    color: "#F2F2F2",
                },
                iconButton: {
                    backgroundColor: "#404040",
                    color: "#F2F2F2"
                },
                dayLabel: {
                    color: 'rgba(256, 256, 256, 0.9)',
                },
            },
            MuiPaper: {
                root: {
                    backgroundColor: "#404040",
                },
            },
            MuiPickersDay: {
                day: {
                    color: "#F2F2F2",
                },
                daySelected: {
                    backgroundColor: "#ECECEA",
                    color: "#434B56",
                    '&:hover': {
                        backgroundColor: "#737373",
                        color: "#F2F2F2"
                    },
                },
                dayDisabled: {
                    color: "#A6A6A6",
                },
                current: {
                    fontWeight: "900",
                    color: "#F2F2F2",
                },
            },
            MuiPickersToolbarText: {
                toolbarTxt: {
                    color: "#F2F2F2"
                },
            },
            MuiPickersClock: {
                pin: {
                    backgroundColor: "#A6A6A6",
                },
                clock: {
                    backgroundColor: "#73737382",
                },
            },
            MuiPickersClockNumber: {
                clockNumber: {
                    color: "#F2F2F2",
                },
            },
            MuiPickersClockPointer: {
                noPoint: {
                    backgroundColor: "#A6A6A67D",
                },
                pointer: {
                    backgroundColor: "#A6A6A6", // стелка
                },
                thumb: {
                    backgroundColor: "#A6A6A6", // стелка
                    borderColor: "#A6A6A6",
                }
            },
            MuiButtonBase: {
                root: {
                    '&:hover': {
                        backgroundColor: "#737373",
                    },
                },
            },
            MuiButton:{
                textPrimary:{
                    color: '#F2F2F2',
                    '&:hover':{
                        backgroundColor: 'rgba(121, 122, 128, 0.22)'
                    }
                },
                root:{
                    // width: 'auto',
                    // height: 'auto'
                }
            },
            MuiTypography: {
                colorPrimary: {
                    color: "#F2F2F2"
                },
            },
            MuiPickersModal: {
                dialogAction: {
                    // color: "#873465",
                },
            },
        },
    })

    return (
        <div className={s.selectorItem}>
            <div className={s.selectorName}>{title}</div>
            <div className={s.selectorContent}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <DateTimePicker
                            clearable={true}
                            value={clearedDate}
                            onChange={handleClearedDateChange}
                            // helperText="Clear Initial State"
                            ampm={false}
                            format="DD.mm.yyyy HH:mm"
                            // variant="inline"
                            hideTabs="true"
                            disablePast="true"
                            minDate={Date.now()}
                            maxDate={Date.now() + 2550000000}
                            autoOk="true"
                            onAccept={(e) => {
                                changedTimes(e)
                            }}
                            // labelFunc={(e)=>{
                            //     console.log(e)
                            // }}
                            // labelFunc={(e)=>{
                            //     console.log(e)
                            // }}
                        />
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </div>
        </div>
    )
}

export default DataTime