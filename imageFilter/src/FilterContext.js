import React, { createContext, Fragment } from 'react'

const Context = {
  blur:0,
  brightness:0,
  contrast:100,
  drop_shadow:'0 0 0',
  grayscale:0,
  hue_rotate:0,
  invert:100,
  opacity:100,
  saturate:100
}

const FilterContext = createContext({
  ...Context
})
  

export const Provide = props => (
  <FilterContext.Provider 
    value={{
      filterValue: Context,
      ...props
    }}
  >
    {props.children}
  </FilterContext.Provider>
)
export const Consumer = FilterContext.Consumer
export default FilterContext