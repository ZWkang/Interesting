import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
const BASECOLOR= 'rgb(115,65,208)'
const PALE_LIGHT_VIOLET = 'rgb(207,196,226)';

const colorMap = {
  primary: '#A5DE37',
  default: '#EEE',
  danger: '#FF4351'
}


export const SliderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  padding: 15px 20px 10px 20px;
  vertical-align: top;
  border: 1px solid var(--BASECOLOR);
  will-change: transform;
  transition: 2s ease;
  cursor: pointer;
  :hover{
    transform: translateX(-10px);
    
  }
`

export const ValueSpan = styled.span`
  flex: 1;
  text-align: left;
  font-size: 28px;
  font-size: 12px;
  color: rgb(140,115,170);
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
  /* flex: 1; */
  outline: none;
  text-decoration: none;
  text-align: center;
  height: 40px;
  /* max-width: 80px; */
  width: calc(100%/4);
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin: 0 10px;
  font-weight: bold;
  border: 1px solid #3f3f3f;
  margin-bottom: 10px;
  ${is('color')`
    background: ${props => colorMap[props.color]};
  `}
  :hover{
    border-radius: 6px;
    box-shadow: 2px 2px 2px #3f3f3f;
  }
`