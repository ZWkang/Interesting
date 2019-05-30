import React from 'react'
import btnConfig from './formItem.config.js'
import styled from "styled-components";
import { Consumer } from './FilterContext'
import Slider from './Slider'
import Input from './Input'
import Color from './Color'
import get from 'lodash.get'
import debounce from 'lodash.debounce'

const isDef = (v) => v === void 666

class GeneratorForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: 0
    }
  }
  getAllData = () => {
    let result = {}
    Object.keys(this.refs).forEach(v => {
      result[v] = this.refs[v].getValue()
    })
    return result
  }
  generator = (context, fromConfigs = btnConfig, parent = {}) => {
    const { filterValue } = context
    const Child = fromConfigs.map((fromItem, i) => {
      let {
        name,
        placeholder
      } = fromItem
      name = [name]
      fromItem.config = fromItem.config || {}

      let getValue
      if(parent.name) {
        let alias = isDef(fromItem.config["alias"]) ? fromItem.name : fromItem.config["alias"]
        getValue = parent.name.concat(alias).join('.')
        console.log(getValue)
        name = parent.name.concat(fromItem.name)
      }
      const path = name.join('.')
      
      const ItemValue = get(filterValue, getValue || path)
      const {
        max,
        min = 0,
        addon = 'px'
      } = fromItem.config


      const wrapper = {
        value: ItemValue,
        name: name,
        key: i,
        min: min,
        max: max,
        addon: addon,
        placeholder: placeholder
      }
      if(fromItem.type === 'text') {
        const onChange = context.setKeyChange(getValue || path)
        return (
          <Input
            {...wrapper}
            onChange={onChange}
          ></Input>
        )
      } else if(fromItem.type === 'range') {
        // console.log(filterValue[v.name])
        const onChange = debounce(context.setKeyChange(getValue || path), 300)
        const { marks } = fromItem.config
        console.log(fromItem.config)
        console.log({
          ...wrapper,
          marks
        })
        return (
          <Slider
            {...wrapper}
            onChange={onChange}
            marks={marks}
          >
          </Slider>
        )
      } else if(fromItem.type === 'number') {
        const onChange = context.setKeyChange(getValue || path)
        return (
          <Input
            {...wrapper}
            onChange={onChange}
          ></Input>
        )
      } else if (fromItem.type === 'color') {
        const onChange = context.setKeyChange(getValue || path)
        console.log(ItemValue)
        return (
          <Color
            {...wrapper}
            onChange={onChange}
          ></Color>
        )
      } else if (fromItem.type === 'group') {
        return <React.Fragment>
          {this.generator(
            context,
            fromItem.children,
            {
              name
            }
          )}
        </React.Fragment>
      }
    })
    return Child
  }
  render() {
    return (
      <Consumer>
        {this.generator}
      </Consumer>
    )
  }
}

export default GeneratorForm