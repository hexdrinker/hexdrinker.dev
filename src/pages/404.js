import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { Head } from '../components/head'

const browser = typeof window !== "undefined" && window;

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return browser && (
    <Layout location={location} title={siteTitle}>
      <Head title="404: Not Found" />
      <h1>404 Not Found</h1>
      <p>유감스럽지만,,, 존재하지 않는 페이지입니다,,,</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
