import React, { Component } from 'react'
import styled from 'styled-components'
import { SliderContainer, ValueSpan } from './baseComponent'

const InputColor = styled.input.attrs({
  type: 'color'
})`
  -webkit-appearance: none;
  border: 0;
  background: #fff;
  border: 2px dashed rgb(140,115,170);
  flex: 2;
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

class Color extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || '#000000'
    }
  }
  handleColorChange = (e) => {
    const { onChange } = this.props

    onChange(e.target.value)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  render(){
    const { value } = this.state
    const { name, onChange } = this.props
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



        <InputColor
          value={value}
          onChange={this.handleColorChange}
        ></InputColor>
      </SliderContainer>
    )
  }
}

export default Color