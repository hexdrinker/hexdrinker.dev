import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const PostItem = ({ node }) => (
  <Link className={`post ${TARGET_CLASS}`} to={node.fields.slug}>
    {node.frontmatter.thumbnail &&
      <div className="post-head" key={node.fields.slug}>
        <img className="post-thumbnail" src={node.frontmatter.thumbnail} alt="thumbnail image"/>      
      </div>
    }
    <div className="post-body">
      <h3 className="post-title">{node.frontmatter.title || node.fields.slug}</h3>
      <p className="post-description">{node.frontmatter.description}</p>
      <span className="post-date">{node.frontmatter.date}</span>
    </div>
  </Link>
)