import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { SliderContainer, ValueSpan } from './baseComponent'

import './number.css'
const AddonInput = styled.span`
  line-height: 1.5;
  display: table-cell;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: rgb(140,115,170);
  border: 1px solid rgb(140,115,170);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-sizing: border-box;
  height: 100%;
`

const MutipeLabel = styled(ValueSpan)`
  display: flex;
  flex-direction: column;
`
const MutipeLabelItem = styled(ValueSpan)`
  flex: 1;
  width: 100%;
  font-size: 12px;
`

export default class InputComponent extends React.Component {
  state = {
    value: this.props.value || 0,
  };
  
  onChange = (value) => {
    this.setState({ value });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  // toggleDisabled
  // toggleReadOnly
  shouldComponentUpdate(nextProps,nextState) {
    if(this.props.value === nextState.value) {
      return false
    }
    return true
  }
  getValue = () => {
    return this.state.value
  }
  render() {
    const { value } = this.state
    const {
      onChange,
      min=0,
      max,
      name,
      addon='%'
      
    } = this.props
    return (
      
      <SliderContainer>
        <MutipeLabel>
          {
            name.map((eachname, index) => {
              return (
                <MutipeLabelItem
                  size={
                    (24 - index * 8)
                  }
                >
                  {eachname}
                </MutipeLabelItem>
              )
            })
          }
        </MutipeLabel>
        <InputNumber
          min={min}
          max={max}
          style={{
            borderStyle: "rgb(140,115,170)"
          }}
          required
          value={this.state.value}
          onChange={onChange}
          // readOnly={this.state.readOnly}
          // disabled={this.state.disabled}
        />
        <AddonInput>{addon}</AddonInput>
      </SliderContainer>
    );
  }
}
