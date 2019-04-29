import React, { Component } from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import { BaseBtn } from './baseComponent'

const colorMap = {
  primary: '#A5DE37',
  default: '#EEE',
  danger: '#FF4351'
}


// export const BaseBtn = styled.button`
//   outline: none;
//   text-decoration: none;
//   text-align: center;
//   height: 40px;
//   /* max-width: 80px; */
//   width: calc(100%/4);
//   display: inline-block;
//   cursor: pointer;
//   border: none;
//   border-radius: 4px;
//   margin: 0 10px;
//   font-weight: bold;
//   border: 1px solid #3f3f3f;
//   ${is('color')`
//     background: ${props => colorMap[props.color]};
//   `}
//   :hover{
//     border-radius: 6px;
//     box-shadow: 2px 2px 2px #3f3f3f;
//   }
// `

const BtnContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  padding: 40px 0;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`


export default class BtnGroups extends Component {
  constructor(props) {
    super(props)
    const { config, saveAs } = props
    config.map(v => {
      this[`saveAs${v.type}`] = saveAs(v.type)
    })
  }

  render() {
    const {
      children,
      config
    } = this.props
    return (
      <BtnContainer>
        {/* 保存
        重置 */}
        {children}
        {
          config.map((btnItem, index) => {
            return (
              <BaseBtn
                color={btnItem.color}
                key={index}
                onClick={this[`saveAs${btnItem.type}`]}
              >
                {btnItem.type}
              </BaseBtn>
            )
          })
        }
      </BtnContainer>
    )
  }
}