import {useState} from 'react';

 function useToggle(initialValue = false){
    const [toggleState,setToggleState] = useState(initialValue);
    
    const toggle = () =>{
        setToggleState(!toggleState);
       
    }
    return [toggleState,toggle];

}

export default useToggle;