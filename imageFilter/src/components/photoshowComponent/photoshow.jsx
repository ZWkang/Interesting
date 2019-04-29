import styled from "styled-components/"

const PhotoShow = styled.div`
    box-sizing:border-box;
    width:auto;
    height:auto;
    padding:0;
    margin:0;
    overflow:hidden;
    max-width:50vw;
    max-height:50vh;
    ${this.props.isDisplayContainer ? 'display:flex;': 'flex:'+ this.props.flexsize}
`

const ImageItem = styled.img.attrs({
    src:props=>props.src || '###',
    alt:props=>props.alt || 'pic place'
})`
    width:auto;
    height:auto;
`

export const PhotoShowContainer = (src,alt)=>{
    <PhotoShowContainer>
        <ImageItem src alt></ImageItem>
    </PhotoShowContainer>
}