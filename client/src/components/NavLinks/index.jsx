import React from 'react'
import { links } from '../../assets/data'
import NavLink from '../NavLink'


const NavLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id='nav-links'>
      {links.map((link) => {
          return <NavLink key={link.id} link={link} itemClass={itemClass} />
      })}
    </ul>
  )
}

export default NavLinks
