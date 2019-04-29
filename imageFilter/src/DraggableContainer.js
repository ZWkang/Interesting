import React, { Fragment, forwardRef } from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import html2canvas from 'html2canvas'

const DragZoneContainer = styled.div`
  border: 4px dashed grey;
  border-radius: 5px;
  position: relative;
  /* max-height: 50vh; */
  max-width: 70vw;
  overflow: hidden;
  min-height: 50px;
  margin: 0;
  padding: 0;
`

const ActiveMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  line-height: 1;
  z-index: 10;
`
const ImgContainer = styled.figure`
  width: auto;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 0;
  ${props=> props.filter ? `filter: ${props.filter};`: ''}
`

const ImageComponent = forwardRef((props, ref) => {
  return (
    <ImgContainer >
      <img ref ={ref} style={
        {
          filter: props.filter,
          maxWidth: '100%'
        }
      }></img>
    </ImgContainer>
  )
  // return <LogProps {...props} forwardedRef={ref} />;
});
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
  // console.log(dropshadow)
  return dropshadow
}
// 对数值做不同处理
const composeFilterContext = (data) => {
  const keys = Object.keys(data)
  const result = []
  const len = keys.length;
  for(let key of keys) {
    if(key === 'hue-rotate') {
      const hueRotate = handleHueRotate(data[key])
      result.push(`${key}(${hueRotate}deg)`)
    }else if(key === 'drop-shadow'){
      const dropShadow = handleDropShadow(data[key])
      result.push(`${key}(${dropShadow})`)
      // result.push('')
    }else if(key === 'blur'){
      const blur = data[key]
      result.push(`${key}(${blur}px)`)
    }else{
      result.push(`${key}(${data[key]}%)`)
    }
  }
  const filterStr = result.join(' ')
  return filterStr
}

class MyDropzone extends React.Component {
    state = {
        uploadfiles: []
    }
    constructor() {
      super()
      this.ImageRef = React.createRef()
    }
   onDrop = (acceptedFiles, rejectedFiles) => {
     // Do something with files
    //  console.log(acceptedFiles)
    this.setState({
        uploadfiles: [...this.state.uploadfiles, acceptedFiles]
    }, () => {
        console.log(this.state.uploadfiles)
        // console.log(this.state.uploadfiles[0] instanceof Blob)
        const a = window.URL.createObjectURL(acceptedFiles[0])
        //通过fileReaderl 来监听它的的事件
        // fileReader.onload=function(e){
        //在盒子中写入一个img标签，并将其读到的资源赋给src实现预览
            // imgContainer.innerHTML="<img src='"+fileReader.result+"' width='300px' height='300px' />";
            this.ImageRef.current.setAttribute('src',a )
        // }
        // files.map(file => Object.assign(file, {
        //   preview: URL.createObjectURL(file)
        // })
    })
    
   }
   render() {
     {console.log(this.props.refss)}
     const {filterValue} = this.props
     const filter = composeFilterContext(filterValue)
    return (
      <Fragment>
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <DragZoneContainer
                {...getRootProps()}
                // className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive && <ActiveMask> drag here </ActiveMask>
                }
                <ImageComponent ref={this.ImageRef} filter={filter}/>
                
              </DragZoneContainer>
            )
          }}
        </Dropzone>
        {/* <button type="" onClick={this.handleBtnClick}> click </button> */}
      </Fragment>
      
    );
  }
}
export default MyDropzone