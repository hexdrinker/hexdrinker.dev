import React, { useMemo } from 'react'
import { PostsContainer } from '../posts-container'
import { PostItem } from '../post-item'
import { CATEGORY_TYPE } from '../../constants'

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(() =>
    posts
      .filter(
        ({ node }) =>
          category === CATEGORY_TYPE.ALL ||
          node.frontmatter.category === category
      )
      .slice(0, count * countOfInitialPost)
  )

  return (
    <PostsContainer>
      {refinedPosts.map(({ node }, index) => (
        <PostItem node={node} key={`item_${index}`} />
      ))}
    </PostsContainer>
  )
}
