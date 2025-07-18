import { useState } from 'react';

export const useInputArrowPress = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

   const arrowPress = (e, options) => {
        const { 
            list, 
            setValue, 
            updateItem,
            hideList 
          } = options;
    
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const direction = e.key === 'ArrowDown' ? 1 : -1;
            
               setSelectedIndex((prev) => (prev + direction + list.length) % list.length);
            }
            else if (e.key === 'Enter'&&list.length > 0 ) {
                e.preventDefault();
                const selectedItem = list[selectedIndex];
                if (selectedItem) {
                    if (typeof selectedItem === 'string') {
                      setValue(selectedItem);
                      updateItem('vacancy', selectedItem);
                    } 
                    else {
                        setValue(selectedItem.cN);
                        updateItem('city', selectedItem.cN);
                        updateItem('region', selectedItem.re);
                      }
                      setSelectedIndex(0);
                      hideList();
                    }
            }
            else if (e.key === 'Enter' && list.length === 0) {
      setSelectedIndex(0);
    } 
  };

  const resetSelection = () => {
    setSelectedIndex(0);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    arrowPress,
    resetSelection
  };
};
