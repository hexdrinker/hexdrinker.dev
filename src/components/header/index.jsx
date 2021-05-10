import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Header = ({ title, location, rootPath, selectCategory }) => {
  const isRoot = location.pathname === rootPath

  const handleClick = () => {
    selectCategory("All")
  }

  return (
    isRoot && (
      <h1 className="home-header">
        <Link to={`/`} className="link" onClick={handleClick}>
          {title}
        </Link>
      </h1>
    )
  )
}
