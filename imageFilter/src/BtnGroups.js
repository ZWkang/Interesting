import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "./baseComponent";

const colorMap = {
  primary: "#58E758",
  default: "#EEE",
  danger: "#FF4351"
};

const BtnContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  padding: 40px 0;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

class BtnGroups extends Component {
  constructor(props) {
    super(props);
    const { config, saveAs } = props;
    config.map(v => {
      console.log(v.type);
      this[`saveAs${v.type}`] = saveAs(v.type);
    });
  }
  render() {
    const { children, config } = this.props;
    return (
      <BtnContainer>
        {this.props.renderAppendBtn(this.props)}
        {config.map((btnItem, index) => {
          return (
            <Button
              color={btnItem.color}
              key={index}
              onClick={this[`saveAs${btnItem.type}`]}
            >
              save as {btnItem.type}
            </Button>
          );
        })}
      </BtnContainer>
    );
  }
}
BtnGroups.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  )
};

export default BtnGroups;
