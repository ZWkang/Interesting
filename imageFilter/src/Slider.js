import 'rc-slider/assets/index.css';
import React from 'react'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import styled from "styled-components";
import FilterContext from './FilterContext'
import { SliderContainer, ValueSpan } from './baseComponent'

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}%`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SliderComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.defaultValue || props.value || 0
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if(nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  shouldComponentUpdate(nextProps,nextState) {
    // console.log(nextProps,nextState)
    if(this.props.value === nextState.value) {
      return false
    }
    return true
  }
  afterChange = () => {
    const {value } = this.state
    this.props.onChange(value)
  }
  handleOnchange = (value   ) => {
    this.setState({
      value
    })
  }
  getValue = () => {
    return this.state.value
  }
  render() {
    const { value } = this.state
    const {
      min=0,
      max,
      handle,
      marks,
      tipFormatter,
      name,
      onChange
    } = this.props
    // {console.log(`rerender: `, name)}
    return (
      <FilterContext.Consumer>
        {context => (
          <SliderContainer>
            <ValueSpan>{name}: </ValueSpan>
            <Slider
              value={value}
              min={min}
              max={max}
              handle={handle}
              marks={marks}
              // tipFormatter={tipFormatter}
              onChange={this.handleOnchange}
              onAfterChange={this.afterChange}
              style={{
                flex: 2,
                margin: '0 15px'
              }}
            />
          </SliderContainer>
        )}
      </FilterContext.Consumer>
      
    )
  }
}

// SliderComponent.contextType = FilterContext;
SliderComponent.defaultProps={
  min: 0,
  max: 100,
  handle: handle,
  marks: {0:'0%', 25: '25%', 50:'50%', 75: '75%',100:'100%'},
  tipFormatter: (v) => `${v}%`,
  name: 'blur',
  onChange: ()=>{}
}

export default SliderComponent