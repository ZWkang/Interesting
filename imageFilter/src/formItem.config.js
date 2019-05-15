export default [
  {
    type: 'text',
    name: "blur",
    config: {
      addon: 'px'
    }
  },
  {
    type: "text",
    name: "brightness",
    config: {
      defaultValue: 100,
      min: 0,
      addon: '%'
    }
  },
  {
    type: "text",
    name: "contrast",
    config: {
      defaultValue: 100,
      min: 0,
      addon: '%'
    }
  },
  {
    type: "group",
    name: "drop-shadow",
    children: [
      // {
      //   type: "text",
      //   name: "offsetX",
      //   config: {
      //     defaultValue: 0,
      //     alias: 0
      //   }
      // },
      {
        type: "text",
        name: "offsetXY",
        config: {
          defaultValue: 0,
          alias: 0,
          addon: 'px'
        }
      },
      {
        type: "text",
        name: "blur-radius",
        config: {
          defaultValue: 0,
          alias: 1,
          addon: 'px'
        }
      },
      {
        type: "text",
        name: "spread-radius",
        config: {
          defaultValue: 0,
          alias: 2,
          addon: 'px'
        }
      },
      {
        type: "color",
        name: "colorpicker",
        config: {
          defaultValue: '',
          alias: 3,
          addon: 'px'
        }
      }
    ]
  },
  {
    type: "range",
    name: "grayscale",
    config: {
      defaultValue: 0,
      min: 0,
      max: 100
    }
  },
  {
    type: "range",
    name: "hue-rotate",
    config: {
      defaultValue: 0,
      min: 0,
      max: 360,
      marks: {
        "0": "0%",
        "60": "60%",
        "120": "120%",
        "180": "180%",
        "240": "240%",
        "300": "300%",
        "360": "360%"
      }
    }
  },
  {
    type: "range",
    name: "invert",
    config: {
      defaultValue: 0,
      min: 0,
      max: 100
    }
  },
  {
    type: "range",
    name: "opacity",
    config: {
      defaultValue: 100,
      min: 0,
      max: 100
    }
  },
  {
    type: "text",
    name: "saturate",
    config: {
      defaultValue: 100,
      min: 0
    }
  },
  {
    type: "range",
    name: "sepia",
    config: {
      defaultValue: 100,
      min: 0,
      max: 100
    }
  }
]