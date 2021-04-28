import React, { useEffect } from 'react'
import './index.scss'

export const PostContainer = ({ html }) => {
  useEffect(() => {
    const images = document.querySelectorAll('.post-container img')
    images.forEach(image => {
      image.parentNode.style.display = "flex"
      image.parentNode.style.justifyContent = "center"
    })
  }, []);

  return <div className="post-container" dangerouslySetInnerHTML={{ __html: html }} />
}
