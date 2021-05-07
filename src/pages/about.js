import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'
import { Head } from '../components/head'

export default ({ data }) => {
  const resumes = data.allMarkdownRemark.edges
  const [language, setLanguage] = useState(Lang.KOREAN);
  const [resume, setResume] = useState('');

  useEffect(() => {
    setResume(resumes
        .filter(({ node }) => node.frontmatter.lang === language)
        .map(({ node }) => node)[0])
  }, []);

  const onSelectLanguage = lang => {
      setLanguage(lang)
      const resume = resumes.filter(({ node }) => node.frontmatter.lang === lang).map(({ node }) => node)[0]
      setResume(resume)
  }
  return (
    <div
      className="resume-container"
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
          3 / 4
        )}`,
      }}
    >
      <Head title={"about hexdrinker"} description={"안녕하세요. hexdrinker입니다."} />
      <div dangerouslySetInnerHTML={{ __html: resume.html }} />
      <div className="footer">
        <p>Written by <a href="https://github.com/hexdrinker" target="_blank">@hexdrinker</a></p>
        <span className={language === Lang.KOREAN && 'active'} onClick={() => onSelectLanguage(Lang.KOREAN)}>KO</span>&nbsp;/&nbsp;
        <span className={language === Lang.ENGLISH && 'active'} onClick={() => onSelectLanguage(Lang.ENGLISH)}>EN</span>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
