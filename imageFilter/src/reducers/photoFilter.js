import {
    ADD_CSS_SVG_URL, 
    CHANGE_BLUR, 
    CHANGE_BRIGHTNESS, 
    CHANGE_CONTRAST, 
    CHANGE_DROP_SHADOW, 
    CHANGE_GRAYSCALE, 
    CHANGE_HUE_ROTATE, 
    CHANGE_INVERT, 
    CHANGE_OPACITY, 
    CHANGE_SATURATE, 
    CHANGE_SEPIA
} from './action.js'



const default_state = {
    blur:0,
    brightness:0,
    contrast:'100%',
    drop_shadow:'0px 0px 0px',
    grayscale:'0%',
    hue_rotate:'0deg',
    invert:'100%',
    opacity:'100%',
    saturate:''
}

// const AppSymbol = Symbol('@@photoFilter');

// let LoadData = localStorage.getItem(AppSymbol);

// const defaultData = {
//     actionStackhistory:[
//     ],
//     nowState:default_state,
//     actionStackfuture:[
//     ]
// }





export default function changeSomething(state = default_state , action){
    switch(action.type){
        case 'ADD_CSS_SVG_URL' : 
            return Object.assign({},state,{

            })
        case /(^CHANGE)/:
            const typeName = action.type.toLowerCase().replace('change_');
            const typeValue = action.value || default_state[typeName] || '';
            return Object.assign({},state,{
                typeName: typeValue
            })
        default:
            return state;
    }
}
