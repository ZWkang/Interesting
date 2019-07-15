import React, { Fragment, forwardRef } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import PropTypes from "prop-types";

const DragZoneContainer = styled.div`
  border: 2px dashed grey;
  border-radius: 5px;
  position: relative;
  /* max-height: 50vh; */
  max-width: 70vw;
  overflow: hidden;
  min-height: 50px;
  margin: 0;
  padding: 0;
  /* outline: 0; */
  min-height: 200px;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  line-height: 1;
  z-index: 10;
  color: #3f3f3f;
`;

const ActiveMask = styled(Mask)`
  background: rgba(0, 0, 0, 0.3);
`;
const ImgContainer = styled.figure`
  width: auto;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 0;
  ${props => (props.filter ? `filter: ${props.filter};` : "")}
`;

const ImageComponent = forwardRef((props, ref) => {
  return (
    <ImgContainer>
      <img
        ref={ref}
        style={{
          filter: props.filter,
          maxWidth: "100%"
        }}
      />
    </ImgContainer>
  );
});
const handleHueRotate = data => {
  let result = data;
  if (data > 360) {
    result = data % 360;
  } else if (data < 0) {
    result = (data % 360) + 360;
  }
  return result;
};
const handleDropShadow = data => {
  const len = data.length;
  const temp = data.slice(0, len - 1);
  const color = data[len - 1];
  const str = temp.reduce((prev, next) => prev + `${next}px `, "");
  const dropshadow = str + color;
  return dropshadow;
};
// 对数值做不同处理
const composeFilterContext = data => {
  const keys = Object.keys(data);
  const result = [];
  const len = keys.length;
  for (let key of keys) {
    if (key === "hue-rotate") {
      const hueRotate = handleHueRotate(data[key]);
      result.push(`${key}(${hueRotate}deg)`);
    } else if (key === "drop-shadow") {
      const dropShadow = handleDropShadow(data[key]);
      result.push(`${key}(${dropShadow})`);
      // result.push('')
    } else if (key === "blur") {
      const blur = data[key];
      result.push(`${key}(${blur}px)`);
    } else {
      result.push(`${key}(${data[key]}%)`);
    }
  }
  const filterStr = result.join(" ");
  return filterStr;
};

class MyDropzone extends React.Component {
  constructor() {
    super();
    this.ImageRef = React.createRef();
    this.ContainerRef = React.createRef();
    this.state = {
      uploadfile: null
    };
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    //  console.log(acceptedFiles)
    this.setState(
      {
        uploadfile: acceptedFiles
      },
      this.setUpImageRefSrc
    );
  };
  getFileSize = file => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function(theFile) {
        let image = new Image();
        image.src = theFile.target.result;
        image.onload = function() {
          file.width = this.width;
          file.height = this.height;
          resolve(file);
        };
      };
    });
  };
  setUpImageRefSrc = async () => {
    const { uploadfile } = this.state;
    if (!uploadfile) return;
    const currentUploadFileBase64Src = window.URL.createObjectURL(
      uploadfile[0]
    );
    const { height, width } = await this.getFileSize(uploadfile[0]);
    this.ImageRef.current.setAttribute("src", currentUploadFileBase64Src);
    this.ImageRef.current.setAttribute("width", width);
    this.ImageRef.current.setAttribute("height", height);
  };
  resetImageSrc = () => {
    const currentTarget = this.ImageRef;
    if (currentTarget && currentTarget.current) {
      currentTarget.current.setAttribute("src", "");
    }
  };

  clear = () => {
    this.setState(
      {
        uploadfile: null
      },
      this.resetImageSrc
    );
  };
  render() {
    const { filterValue } = this.props;
    const { uploadfile } = this.state;
    const filter = composeFilterContext(filterValue);
    return (
      <Fragment>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <DragZoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? <ActiveMask> drag here </ActiveMask> : null}
                {uploadfile || isDragActive ? null : <Mask>upload</Mask>}
                <ImageComponent ref={this.ImageRef} filter={filter} />
              </DragZoneContainer>
            );
          }}
        </Dropzone>
      </Fragment>
    );
  }
}

MyDropzone.propTypes = {
  filterValue: PropTypes.shape({})
};

export default MyDropzone;
