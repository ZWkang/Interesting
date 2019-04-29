import styled from 'styled-components'
import React,{ PropTypes } from 'react'


const InputTypeText = styled.input.attrs({
    type:'text',
    placeholder:props=>props.placeholder || 'some thing',
})`
    box-sizing:border-box;

    display:block;

    text-decoration:none;
    text-align:center;

    -web-kit-appearance:none;
    -moz-appearance:none;

    ${props=>props.somethingAdd}
    
    font-size:1.4em;
    height:2.7em;
    width:100%;
    border-radius:4px;
    border:1px solid #c8cccf;
    color:#6a6f77;

    padding: 0 3px;
    outline:0;
    &:focus{
        border:1px solid #ff7496;
    }
    &::webkit-input-placeholder{
        color:#6a6f77;
    }
`
const InputTypeRange = styled.input.attrs({
    type:'range',
    min:props=>props.min||'0',
    max:props=>props.max||'100',
})`
    width:100%;
    height:2.7em;
`

// const DivContainer = styled.div`
//     display:flex;
// `
// const inputContainer = ({}) => {
//     data.map((v)=>{
//         return v.type == 'range' ? <InputTypeRange></InputTypeRange> : <InputTypeText></InputTypeText>;
//     })
// }

const createCompoent = (Component)=>{
    return ({name,onChange}) => {
        <li>
            <label>{name}</label>
            <Component onChange = {onChange()}/>
        </li>
    }
}

export const oneInputContainer = createCompoent(InputTypeText);
export const oneRangeContainer = createCompoent(InputTypeRange);
