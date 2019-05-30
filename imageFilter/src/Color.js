import React, { Component } from 'react'
import styled from 'styled-components'
import {InputItemContainer, ValueSpan } from './baseComponent'

const InputColor = styled.input.attrs({
  type: 'color'
})`
  -webkit-appearance: none;
  border: 0;
  background: #fff;
  border: 2px dashed rgb(140,115,170);
  flex: 0 0 75%;
  @media only screen and (max-width:600px ) {
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
  flex: 1;
  width: 100%;
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
      <Container>
        <MutipeLabel>
          {
            name.map((eachname, index) => {
              return (
                <MutipeLabelItem
                  size={
                    (18 - index * 3)
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
      </Container>
    )
  }
}

export default Color