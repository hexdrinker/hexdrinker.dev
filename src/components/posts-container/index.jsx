import React from 'react'

import './index.scss'

export const PostsContainer = React.memo(({ children }) => (
  <div className="posts-container">{children}</div>
))
