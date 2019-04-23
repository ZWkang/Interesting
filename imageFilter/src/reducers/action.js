export const ADD_CSS_SVG_URL = 'ADD_CSS_SVG_URL';
export const CHANGE_BLUR = 'CHANGE_BLUR';
export const CHANGE_BRIGHTNESS = 'CHANGE_BRIGHTNESS';
export const CHANGE_CONTRAST = 'CHANGE_CONTRAST';
export const CHANGE_DROP_SHADOW = 'CHANGE_DROP_SHADOW';
export const CHANGE_GRAYSCALE = 'CHANGE_GRAYSCALE';
export const CHANGE_HUE_ROTATE = 'CHANGE_HUE_RATATE';
export const CHANGE_INVERT = 'CHANGE_INVERT';
export const CHANGE_OPACITY = 'CHANGE_OPACITY';
export const CHANGE_SATURATE = 'CHANGE_SATURATE';
export const CHANGE_SEPIA = 'CHANGE_SEPIA';

export function add_css_svg_url(url) {
    return { type : ADD_CSS_SVG_URL , url };
}
export function change_blur(value = 0) {
    return { type: CHANGE_BLUR, value };
}
export function change_brightness(value = 1) {
    return { type: CHANGE_BRIGHTNESS, value };
}
export function change_contrast(value = '100%') {
    return { type: CHANGE_CONTRAST, value };
}
export function change_drop_shadow(value = {
    x:0,
    y:0,
    radius:0,
    spread_radius:0,
    color:null
}) {
    return { type: CHANGE_DROP_SHADOW, value };
}
export function change_grayscale(value = '0%') {
    return { type: CHANGE_GRAYSCALE, value };
}
export function change_hue_rotate(value = '0deg') {
    return { type: CHANGE_HUE_ROTATE, value };
}
export function change_invert(value = '100%') {
    return { type: CHANGE_INVERT, value };
}
export function change_opacity(value = '100%') {
    return { type: CHANGE_OPACITY, value };
}
export function change_saturate(value = '100%') { 
    return { type: CHANGE_SATURATE, value };
}
export function change_sepia(value = '100%') { 
    return { type: CHANGE_SEPIA, value };
}