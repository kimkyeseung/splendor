import React from 'react'
import * as Icons from 'react-icons/ri'

const iconNameMap = {
  money: 'RiCoinsLine',
  cart: 'RiShoppingCart2Line'
}

export const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[iconNameMap[name]]

  return (
    <IconComponent className="icon" {...props}/> || null
  )
}
