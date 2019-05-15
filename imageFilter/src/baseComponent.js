import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
const BASECOLOR= 'rgb(115,65,208)'
const PALE_LIGHT_VIOLET = 'rgb(207,196,226)';

const colorMap = {
  primary: '#58E758',
  default: '#EEE',
  danger: '#FF4351'
}


export const BaseInputItemContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  height: auto;
  display: flex;
  flex-direction: space-between;
  align-items: center;
  vertical-align: top;
  border-bottom: 1px solid;
  border-color: var(--default-border-color);
  will-change: transform;
  transition: .5s ease-in-out;
  cursor: pointer;
`
export const InputItemContainer = styled(BaseInputItemContainer)`
  :hover{
    transform: scale(1.05);
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`



export const ValueSpan = styled.span`
  text-align: left;
  font-size: 20px;
  color: #3f3f3f;
  flex: 0 0 25%;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
  ${is('size')`
    font-size: ${props=>props.size}px;
  `}
`
export const LayoutContainer = styled.section`
  display:flex;/*设为伸缩容器*/  
  flex-flow:row;/*伸缩项目单行排列*/  
  width: 100%;
`

export const LayoutLeft = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
`

export const LayoutRight = styled.div`
  flex: 1;
  margin-left: 10px;
`


export const BaseBtn = styled.button`
  outline: 0;
  text-decoration: none;
  text-align: center;
  height: 40px;
  width: calc(100%/4);
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin: 0 10px;
  font-weight: bold;
  border: 1px solid #3f3f3f;
  margin-bottom: 10px;
  :focus {
    border-color: highlight;
  }
`

export const Button = styled(BaseBtn)`
  ${is('color')`
    background: ${props => colorMap[props.color]};
  `}
  :hover{
    border-radius: 6px;
    box-shadow: 2px 2px 2px #3f3f3f;
  }
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`


export const LabelBaseSize = 16;
export const SizeIncrement = 2;