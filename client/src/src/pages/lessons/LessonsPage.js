import s from './LessonsPage.module.css'
import ItemLessons from "./ItemLessons/ItemLessons";
import {connect} from "react-redux";


const LessonsPage = ({lessons}) => {
    // const {lessons} = useContext(DataContext)

    const setLessonsWeek =
        lessons.sort((a,b)=>a.dateCarrying - b.dateCarrying).map((item, idx,) => {
            return <ItemLessons item={item} idx={idx} key={item._id + idx}/>
        })

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.blockTitle}>
                    <div className={s.titleText}>
                        Все ваши занятия
                    </div>
                </div>
                {}
                <div className={s.blockContent}>
                    <div className={s.main}>
                        {
                            !(lessons.length > 0) ?
                                <div className={s.nonLessons}>
                                    У вас нет занятий
                                </div>
                                :
                                <div className={s.mainCards}>
                                    {setLessonsWeek}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        lessons: state.lessons.lessons
    }
}

export default connect(mapStateToProps, null)(LessonsPage)