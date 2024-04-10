import React from 'react'
import SimpleInputField from '../InputFields/SimpleInputField'

const TypographyColorTab = () => {

  return (
    <SimpleInputField
      nameList={[
        { name: '[options][typography_color][hover_color]', title: "hover_color", type: "color" },
        { name: '[options][typography_color][primary_color]', title: "primary_color", type: "color" },
        { name: '[options][typography_color][secondary_color]', title: "secondary_color", type: "color" },
        { name: '[options][typography_color][link_color]', title: "link_color", type: "color" },
      ]} />
  )
}

export default TypographyColorTab