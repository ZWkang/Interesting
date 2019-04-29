import React from 'react'
import btnConfig from './btn-group.js'
import styled from "styled-components";
import { Consumer } from './FilterContext'
import SimpleInput from './simpleInput'
import Slider from './Slider'
import Input from './Input'
import Color from './Color'
import get from 'lodash.get'
import debounce from 'lodash.debounce'

const isDef = (v) => v == null
const Dive = styled.div`
  display: flex;
`

const Flex = styled.div`
  flex: 1;
  width: 30%;
`



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
  generator = (context, config = btnConfig, parent = {
    // name: []
    // key: 
  }) => {
    const { filterValue } = context
    const Child = config.map((v, i) => {
      let { name } = v
      name = [name]
      // console.log(v)
      v.config = v.config || {}

      let getValue
      if(parent.name) {
        let alias = isDef(v.config["alias"]) ? v.name : v.config["alias"]
        getValue = parent.name.concat(alias).join('.')
        console.log(getValue)
        name = parent.name.concat(v.name)
      }
      const path = name.join('.')
      
      const ItemValue = get(filterValue, getValue || path)

      // debugger
      
      if(v.type === 'text') {
        const onChange = context.setKeyChange(getValue || path)
        return (
          <Input
            value={ItemValue}
            name={name}
            placeholder={v.placeholder}
            key={i}
            onChange={onChange}
            addon={v.config.addon}
          ></Input>
        )
      } else if(v.type === 'range') {
        // console.log(filterValue[v.name])
        const onChange = debounce(context.setKeyChange(getValue || path), 300)
        return (
          <Slider
            value={ItemValue}
            name={name}
            key={i}
            onChange={onChange}
          >
            
          </Slider>
        )
      } else if(v.type === 'number') {
        const onChange = context.setKeyChange(getValue || path)
        return (
          <Input
            value={ItemValue}
            name={name}
            placeholder={v.placeholder}
            key={i}
            onChange={onChange}
            addon={v.config.addon}
          ></Input>
        )
      } else if (v.type === 'color') {
        const onChange = context.setKeyChange(getValue || path)
        console.log(ItemValue)
        return (
          <Color
            value={ItemValue}
            name={name}
            placeholder={v.placeholder}
            key={i}
            onChange={onChange}
          ></Color>
        )
      } else if (v.type === 'group') {

        // const change = (v) => {
        //   const path = name.join('.')
        //   const changecallback = context.setKeyChange(path)
        //   changecallback(v)
        // }
        return <React.Fragment>
          {this.generator(
            context,
            v.children,
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
      // <React.Fragment>
      // <Consumer>
        {/* <Dive>
          {btnConfig.map((v, index) => {
            if(v.type === 'text'){
              return <Flex key={index} ref={v.name}>{v.name}</Flex>
            } else if(v.type === 'range') {
              return <Flex key={index}>{v.name}range</Flex>
            } 
          })}
        </Dive> */}
       
        
      // </Consumer>
    // )
    // return (
    //   <React.Fragment>
    //     <input type="color" onChange={(v) => {
    //       console.log(v.target.value)
    //     }}></input>
    //   </React.Fragment>
    // )
    {console.log('fuck i rerendered')}
    return (
      <Consumer>
        {this.generator}
      </Consumer>
    )
  }
}

export default GeneratorForm