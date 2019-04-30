import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import React from 'react';
import styled from 'styled-components'
import { InputItemContainer, ValueSpan, LabelBaseSize, SizeIncrement } from './baseComponent'

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
  border: 1px solid;
  border-color: var(--default-border-color);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-sizing: border-box;
  height: 100%;

`
const InputWrapper = styled.div`
  display: flex;
  flex:0 0 75%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
const Container = styled(InputItemContainer)`
  padding: 10px;
`

const MutipeLabel = styled(ValueSpan)`
  display: flex;
  flex-direction: column;
`
const MutipeLabelItem = styled(ValueSpan)`
  width: 100%;
  vertical-align: text-top;
  /* display: inline-block; */
`
const isDef = value => typeof value === 'undefined'
const handleStartValue = ({
  defaultValue,
  value
}) => {
  const result = isDef(defaultValue) ? 
                  (
                    isDef(value)
                      ? 0
                      : value
                  )
                  : defaultValue
  return result
}
export default class InputComponent extends React.Component {
  // state = {
  //   value: this.props.defaultValue || this.props.value || 0,
  // };
  constructor(props) {
    super(props)
    const value = handleStartValue(props)
    console.log(handleStartValue({
      defaultValue: undefined,
      value: 123
    }))
    this.state = {
      value
    }
  }
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
      
      <Container>
        <MutipeLabel>
          {
            name.map((eachname, index) => {
              const size = LabelBaseSize - SizeIncrement * index
              return (
                <MutipeLabelItem
                  size={size}
                >
                  {eachname}
                </MutipeLabelItem>
              )
            })
          }
        </MutipeLabel>
          <InputWrapper>
          <InputNumber
          min={min}
          max={max}
          style={{
            borderStyle: "#000"
          }}
          required
          value={this.state.value}
          onChange={onChange}
          // readOnly={this.state.readOnly}
          // disabled={this.state.disabled}
        />
        <AddonInput>{addon}</AddonInput>
          </InputWrapper>

      </Container>
    );
  }
}
