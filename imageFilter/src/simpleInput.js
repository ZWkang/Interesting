import React, { Component } from 'react'
import styled from 'styled-components'
import { SliderContainer, ValueSpan } from './baseComponent'

const InputTypeText = styled.input.attrs({
  type:'number',
  placeholder:props=>props.placeholder || 'some thing',
})`
  box-sizing:border-box;
  text-decoration:none;
  text-align:center;
  appearance: none;
  font-size:14px;

  position: relative;
  width:100%;
  float: left;
  z-index:3;

  border-radius:4px;
  border:1px solid #c8cccf;
  color:#6a6f77;

  padding: 6 12px;
  outline:0;

  display: table-cell;
  height: 34px;
  margin: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &:focus{
      border:1px solid #ff7496;
  }
  &::webkit-input-placeholder{
      color:#6a6f77;
  }
  float: left;
`

const AddonInput = styled.span`
  line-height: 1.5;
  display: table-cell;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box;
  width: 1%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const InputGroupContainer = styled.div`
  position: relative;
  flex: 3;
  display: table;
  box-sizing: border-box;
  max-width: 67%;
`

class SimpleInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || ''
    }
  }
  render(){
    const {
      value
    } = this.state
    const {
      name,
      onChange,
      placeholder
    } = this.props
    // console.log(name)
    return (
      <SliderContainer>

        <ValueSpan>
          {name}: {value}
        </ValueSpan>
        <InputGroupContainer>
        
        <InputTypeText
          placeholder={placeholder}
          onChange={onChange}
        />
        <AddonInput>
          %
        </AddonInput>
        </InputGroupContainer>
      </SliderContainer>
    )
  }
}

export default SimpleInput