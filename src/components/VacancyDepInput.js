import React, {useState, useEffect, useRef, useCallback} from "react";
import { IoClose } from "react-icons/io5";


const VacancyDepInput = ({specialtiesBase, setNewVacancy, setSelectVacancyValue, newVacancy}) => {

    const departments = specialtiesBase.map(el => el.category),
    totalItems = departments.length;

    const getIndexByDepartment = useCallback((department) => {
        return departments.findIndex(dep => dep === department);
    }, [departments]);

    const initialIndex = newVacancy?.department 
    ? getIndexByDepartment(newVacancy.department) 
    : 0;

    const [showSelectBubl, setShowSelectBubl] = useState(false),
          [currentIndex, setCurrentIndex] = useState(initialIndex > -1 ? initialIndex : 0),
          [selectVacDepValue, setSelectVacDepValue] = useState(newVacancy?.department || '');

    const selectRef = useRef(null);
    const closeButtonRef = useRef(null);
    const initialized = useRef(false);


    useEffect(() => {
        // При первом рендере устанавливается флаг инициализации
        if (!initialized.current) {
            initialized.current = true;
            
            if (newVacancy?.department) {
                const index = getIndexByDepartment(newVacancy.department);
                
                if (index !== -1) {
                    setCurrentIndex(index);
                    setSelectVacDepValue(newVacancy.department);
                }
            }
        }
        // Заход после предпросмотра 
        else if (newVacancy?.department && newVacancy.department !== selectVacDepValue) {
            const index = getIndexByDepartment(newVacancy.department);
            
            if (index !== -1) {
                setCurrentIndex(index);
                setSelectVacDepValue(newVacancy.department);
            }
        }
    }, [newVacancy?.department, selectVacDepValue, getIndexByDepartment]);


    const resetVacancy = () => {
        setSelectVacancyValue('');
        setNewVacancy(prev => ({...prev, vacancy: ''}));
    }

          useEffect(() => { // Скрытие/открытие скролла в модальном окне
            const modalAdCont = document.querySelector('.modalAdCont');
            
            if (showSelectBubl) {
                if (modalAdCont) {
                    modalAdCont.style.overflow = 'hidden';
                }
            } else {
                if (modalAdCont) {
                    modalAdCont.style.overflow = 'auto';
                }
            }
    
            return () => {
                if (modalAdCont) {
                    modalAdCont.style.overflow = 'auto';
                }
            };
        }, [showSelectBubl]);    
        
        useEffect(() => {
            const handleClickOutside = (e) => {// Скрытие бабл селекта при клике вне его
                if (selectRef.current && !selectRef.current.contains(e.target)) {
                    setShowSelectBubl(false);
                }
            };
    
            const handleWheel = (e) => {// Прокрутка колесиком мыши
                if (showSelectBubl) {
                    const direction = e.deltaY > 0 ? 'down' : 'up';
                    handleDriveWhell(direction);
                    e.preventDefault();
                }
            };
    
            if (showSelectBubl) {
                document.addEventListener('mousedown', handleClickOutside);
                document.addEventListener('wheel', handleWheel, { passive: false });
            }
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('wheel', handleWheel);
            };
        });

    const getVisibleItems = () => { // Показ видимых элементов
        const items = [];
        for (let i = -2; i <= 2; i++) {
            let index = (currentIndex + i + totalItems) % totalItems;
            items.push({
                value: departments[index],
                index: index,
                className: getItemClassName(i)
            });
        }
        return items;
    };

    const getItemClassName = (position) => {
        const classes = {
            '-2': 'one',
            '-1': 'two',
            '0': 'three',
            '1': 'four',
            '2': 'five'
        };
        return classes[position];
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const isBtnFocused = document.activeElement.id === 'selectBtn';
            const isCloseBtnFocused = document.activeElement === closeButtonRef.current;

            if (!showSelectBubl && !isBtnFocused) return;

            if (e.key === 'Enter') {
                // e.preventDefault();
                setShowSelectBubl(true);
                if (isCloseBtnFocused) {
                    setSelectVacDepValue('');
                    setShowSelectBubl(false);
                    setNewVacancy(prev => ({...prev, department: ''}));
                    resetVacancy();
                } else if (showSelectBubl) {
                    handleSelect(departments[currentIndex]);
                    resetVacancy();
                }   
             }
            if (showSelectBubl) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setCurrentIndex((prev) => (prev + 1) % totalItems);
                } 
            }    
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
});


const handleSelect = (value) => {
    setSelectVacDepValue(value);
    setShowSelectBubl(false);
    setNewVacancy(prev => ({...prev, department: value}));
};

const handleDriveWhell = (direction) => {
    if (direction === 'up') {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
};

const handleItemClick = (value, position) => {
    if (position === 0) { 
        handleSelect(value);
    } else {
        const clickedIndex = departments.indexOf(value);
        setCurrentIndex(clickedIndex);
    }
};
    
    return (
        <>
            <div className="itemAdd upShow" ref={selectRef}>

                <button id="selectBtn" className="modalInputAd shortBtn" autoFocus={true}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSelectBubl(true);
                        }}
                >
                    {selectVacDepValue || 'Виберіть галузь*'}
                    <div className="arrow Up"></div>
                    <div className="arrow Down"></div>
                </button>
                
                <div className={showSelectBubl?"selectWill show":"selectWill hidden"}>
                <div className="darkShadaw"></div>
                {showSelectBubl&&(
                    <button className="closeSelect" ref={closeButtonRef}
                        onClick={() => {
                            setShowSelectBubl(false);
                            setSelectVacDepValue('');
                            setNewVacancy(prev => ({...prev, department: ''}));
                            resetVacancy();
                        }}
                    >
                        <span><IoClose className="resetSearchIcon" /></span>
                    </button>)
                }
                {showSelectBubl&&(
                    <button className="arrowUpBtn"

                        onClick={(e) => 
                            {e.preventDefault();
                            handleDriveWhell("up");
                        }}
                    >
                        <div className="bigUp"></div>
                    </button>)
                }

                {showSelectBubl&&(
                    <button className="arrowDowBtn"
                        onClick={(e) => 
                            {e.preventDefault();
                            handleDriveWhell("down");
                    }}
                    >
                        <div className="bigDown"></div>
                    </button>)
                }
                    <ul>
                    {getVisibleItems().map((item, index)=> (
                        <li className="selectItem" key={`${item.value}`}>
                            <button className={`selectBtn ${item.className}`} 
                                onClick={(e) => 
                                    {e.preventDefault();
                                        handleItemClick(item.value, index - 2);
                                        resetVacancy();
                                    }} 
                            >
                                <div className="btnText ">
                                    {item.value}
                                </div>
                            </button>
                        </li>
                    ))}
                    </ul>
                    
                </div>
                
            </div>
 
        </>
    )
}
export default VacancyDepInput