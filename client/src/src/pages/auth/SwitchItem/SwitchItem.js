import s from "./SwitchItem.module.css"

const SwitchItem = (props) => {
    const mouseHover = (e) => {
        if (!e.target.firstChild){return}
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop
        e.target.firstChild.setAttribute('style', `top: ${y}px; left: ${x}px`)
    }


    if (props.text === 'Вход') {
        return (
            <div
                className={`${s.blockSwitchItem} ${props.switchBtn ? s.blockSwitchItemActive : undefined}`}
                onMouseEnter={mouseHover}
                onMouseOut={mouseHover}
                onClick={() => {
                    props.setSwitchBtn(true)
                }}
            >
                <span></span>
                <p>{props.text}</p>
            </div>
        )
    } else {
        return (
            <div
                className={`${s.blockSwitchItem} ${props.switchBtn ? undefined : s.blockSwitchItemActive}`}
                onMouseEnter={mouseHover}
                onMouseOut={mouseHover}
                onClick={() => {
                    props.setSwitchBtn(false)
                }}

            >
                <span></span>
                <p>{props.text}</p>
            </div>
        )
    }

    return <div>null</div>
}

export default SwitchItem