import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const PostItem = ({ node }) => (
  <div className={`post ${TARGET_CLASS}`} key={node.fields.slug}>
    {node.frontmatter.thumbnail &&
      <Link className="post-head" to={node.fields.slug}>
        <img className="post-thumbnail" src={node.frontmatter.thumbnail} alt="thumbnail image"/>      
      </Link>
    }
    <div className="post-body">
      <Link to={node.fields.slug}>
        <h3 className="post-title">{node.frontmatter.title || node.fields.slug}</h3>
        <p className="post-description">{node.frontmatter.description}</p>
      </Link>
      <span className="post-date">{node.frontmatter.date}</span>
    </div>
    {node.frontmatter.tags.length ? (
      <div className="post-footer">
        {node.frontmatter.tags.map((tag, index) => (
          <div className="tag" key={`tag_${index}`}>{tag}</div>
        ))}
      </div>
    ) : null}
  </div>
)