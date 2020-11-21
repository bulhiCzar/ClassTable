import AsyncSelect from 'react-select/async'
import s from "../../AddPage.module.css"

const AsyncSelectCast = ({loadOptions, onChange, defaultValue, placeholder = '', title}) => {

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            border: 'none',
            borderRadius: 'none',
            color: '#F2F2F2',
            backgroundColor: '#3e3d3d',
            marginTop: '4px'
        }),
        option: (base, s)=>{
          return{
              ...base,
              backgroundColor: s.isFocused? '#494949' : ''
          }
        },
        container: (base, s) => {
            return {
                minHeight: '38px',
                position: 'relative',
                boxSizing: 'border-box',
            }
        },
        menuList: (base, s)=>{
            return{
                ...base,
                padding: '0'
            }
        },
        valueContainer: (base, s)=>{
            return{
                ...base,
                alignItems: 'center',
                flex: '1',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '0'
            }
        },
        indicatorsContainer: (base, s)=>{
            return{
                ...base,
                transition: '400ms',
                transform: s.isFocused ? 'rotate(180deg)' : '',
            }
        },
        indicatorSeparator: ()=>({display: 'none'}),
        control: (base, s) => {
            return {
                // ...base,
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderRadius: '0',
                borderStyle: 'solid',
                borderWidth: '0',
                cursor: 'default',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                transition: '400ms',
                color: '#F2F2F2',
                borderBottom: s.isFocused ? '2px solid  #F2F2F27D' : '1px solid  #404040',
                boxShadow: 'none',
            }
        },
        placeholder: (base, s) => {

            return {
                ...base,
                color: '#F2F2F27D',
                marginLeft: '2px',
                marginRight: '2px',
                position: 'absolute',
                top: '50%',
                '-webkit-transform': 'translateY(-50%)',
                '-ms-transform': 'translateY(-50%)',
                transform: 'translateY(-50%)',
                boxSizing: 'border-box',
            }
        },

        singleValue: (provided, state) => {
            return {
                ...provided,
                color: '#F2F2F2',
            }
        }

    }

    return (
        <div className={s.selectorItem}>
            <div className={s.selectorName}>{title}</div>
            <div className={s.selectorContent}>
                <AsyncSelect
                    styles={customStyles}
                    loadOptions={loadOptions}
                    onChange={(e) => {
                        onChange(e)
                    }}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    closeMenuOnScroll={false}
                    cacheOptions
                    defaultOptions
                    // menuIsOpen={true}
                />
            </div>
        </div>
    )
}

export default AsyncSelectCast