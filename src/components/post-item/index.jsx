import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const PostItem = ({ node }) => {
  const { title, date, thumbnail, description, tags } = node.frontmatter;

  return (
    <div className={`post ${TARGET_CLASS}`} key={node.fields.slug}>
      {node.frontmatter.thumbnail &&
        <Link className="post-head" to={node.fields.slug}>
          <img className="post-thumbnail" src={thumbnail} alt="thumbnail image"/>      
        </Link>
      }
      <div className="post-body">
        <Link to={node.fields.slug}>
          <h3 className="post-title">{title || node.fields.slug}</h3>
          {!!description && <p className="post-description">{description}</p>}
        </Link>
        <span className="post-date">{date}</span>
      </div>
      {!!tags && (
        <div className="post-footer">
          {tags.map((tag, index) => (
            <div className="tag" key={`tag_${index}`}>{tag}</div>
          ))}
        </div>
      )}
    </div>
  )
}