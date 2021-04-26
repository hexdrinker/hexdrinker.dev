const path = require(`path`)
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   createTypes(`
//     type MarkdownRemark implements Node {
//       id: ID!
//       html: String!
//       excerpt: String
//       frontmatter: Frontmatter
//       fields: MarkdownRemarkFields
//       featuredImg: File @link(from: "featuredImg___NODE")
//     }
//     type Frontmatter {
//       title: String!
//       date(formatString: String): Date
//       featuredImgUrl: String
//       featuredImgAlt: String
//     }
//     type MarkdownRemarkFields {
//       slug: String
//     }
//   `)
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                draft
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category
    )

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = async ({ node, actions, getNode, store, cache, createNodeId }) => {
  const { createNodeField, createNode } = actions
  // if (
  //   node.internal.type === "MarkdownRemark" &&
  //   node.frontmatter.featuredImgUrl !== null
  // ) {
  //   const value = createFilePath({ node, getNode })

  //   let fileNode = await createRemoteFileNode({
  //     url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
  //     parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
  //     createNode, // helper function in gatsby-node to generate the node
  //     createNodeId, // helper function in gatsby-node to generate the node id
  //     cache, // Gatsby's cache
  //     store, // Gatsby's Redux store
  //   })
  //   await createNodeField({
  //     name: `slug`,
  //     node,
  //     value
  //   })
  //   // if the file was created, attach the new node to the parent node
  //   if (fileNode) {
  //     node.featuredImg___NODE = fileNode.id
  //   }
  // }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
