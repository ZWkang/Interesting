import React, { createContext, Component, createRef } from 'react';
import './common/normalze.css';
import MyDropzone from './DraggableContainer'
import styled from 'styled-components'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import SliderComponent from './Slider';
// import styled from 'styled-components';
import FilterContext, { Provide } from './FilterContext'
import BtnGroups from './BtnGroups'
import GeneratorForm from './generatorForm'
import get from 'lodash.get'
import set from 'lodash.set'
import debounce from 'lodash.debounce'
import is from 'styled-is'
import html2canvas from 'html2canvas'
import Canvas2Image from './hackCanvas2Image'
import { LayoutContainer, LayoutLeft, LayoutRight, BaseBtn} from './baseComponent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 3000
})
const Page = styled.main`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
`

const Handle = Slider.Handle;


const Section = styled.section`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  ${is('half')`
    width: 50%;
  `}
`

const btnGroup = [
  {
    type: 'save png',
    color: 'primary'
  },
  {
    type:  'save jpeg',
    color: 'primary'
  },
  {
    type:  'save gif',
    color: 'primary'
  },
  {
    type:  'save bmp',
    color: 'primary'
  }
]


const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const Context = {
  blur:0,
  brightness:100,
  contrast:100,
  "drop-shadow":[ 1, 0, 0, '#000000'],
  grayscale:0,
  "hue-rotate":0,
  invert:0,
  opacity:100,
  saturate:100,
  sepia: 0
}
// filter: blur(5px);
// filter: brightness(0.4);
// filter: contrast(200%);
// filter: drop-shadow(16px 16px 20px blue);
// filter: grayscale(50%);
// filter: hue-rotate(90deg);
// filter: invert(75%);
// filter: opacity(25%);
// filter: saturate(30%);
// filter: sepia(60%);
// const FilterContext = createContext({
//   ...Context
// })

const handleHueRotate = (data) => {
  let result = data;
  if(data > 360) {
    result = data % 360
  } else if (data < 0) {
    result = data % 360 + 360
  }
  return result
}
const handleDropShadow = (data) => {
  const len = data.length;
  const temp = data.slice(0, len - 1)
  const color = data[len-1]
  const str = temp.reduce((prev, next) => (prev + `${next}px `), '')
  const dropshadow = str + color
  return dropshadow
}
// 对数值做不同处理
const composeFilterContext = (data) => {
  const keys = Object.keys(data)
  const result = []
  const len = keys.length;
  for(let key of keys) {
    if(key === 'hue_rotate') {
      const hueRotate = handleHueRotate(data[key])
      result.push(hueRotate)
    }else if(key === 'drop_shadow'){
      const dropShadow = handleDropShadow(data[key])
      result.push(dropShadow)
    }else if(key === 'blur'){
      const blur = data[key]
      result.push(`${blur}px`)
    }else{
      result.push(`${data[key]}%`)
    }
  }
  const filterStr = result.join(' ')
  return filterStr
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: Context,
      dropImage: null
    }
  }
  resetState = () => {
    this.setState({
      filterValue: Context
    })
  }
  saveAs = (type) => {
    
    return () => {
      
      // if(!this.refs.dropzone || !this.refs.dropzone.ImageRef || !this.refs.dropzone.ImageRef.current){
        
      // }
      // console.log(this.refs.dropzone, this.refs.dropzone.ImageRef, this.refs.dropzone.ImageRef.current)
      
      const saveRef = this.refs.dropzone.ImageRef.current
      const saveRefSrc = saveRef.getAttribute('src')
      if(!saveRefSrc) {
        this.toastOps('还没有上传图片')
        return
      }
      this.notify()
      html2canvas(saveRef).then((canvas) => {
        Canvas2Image.saveAsImage(canvas, canvas.width, canvas.height, type, this.update)
      });
    }
  }
  toastId = null;

  notify = () => this.toastId = toast("saving ~~", { autoClose: false });

  update = () => toast.update(this.toastId, { render:"save success", type: toast.TYPE.SUCCESS, autoClose: 3000 });

  toastOps = (ops) => {
    return toast.error(ops)
  }
  setKeyChange = (key) => {
    return (value, ...rest) => {
      const { filterValue } = this.state
      const copyFilter = { ...filterValue }
      if(value === null || value === '') {
        return false
      }
      // if(/\./.test(key)) {
        set(copyFilter, key, value)
      // }
      this.setState({
        filterValue: copyFilter
      })
    }
  }
  render() {
    const { dispatch } = this.props
    const {
      filterValue
    } = this.state
    return (
      <Provide 
        filterValue={filterValue}
        changeFilterValue = {this.setKeyChange}
        resetState={this.resetState}
        setKeyChange={this.setKeyChange}
      >
      {/* <ToastContainer></ToastContainer> */}
      <Page>

        <LayoutContainer>
          <LayoutLeft>
            <Section>
              <MyDropzone ref="dropzone" filterValue={this.state.filterValue}></MyDropzone>
            </Section>
            <Section style={{
              flex: 1
            }}>
              <BtnGroups
                saveAs={this.saveAs}
                config={btnGroup}
              >
                <BaseBtn
                  onClick={this.resetState}
                >
                  重置参数
                </BaseBtn>
              </BtnGroups>
            </Section>
          </LayoutLeft>
          <LayoutRight>
            <GeneratorForm />
          </LayoutRight>
        </LayoutContainer>

      </Page>
        
      </Provide>
    )
  }
}

export default App;
