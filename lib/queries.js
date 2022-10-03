const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
  "category":category->{name, "slug": slug.current, picture},
`

const categoryFields = `
  _id,
  name,
  description,
  picture,
  "slug": slug.current,
`

export const indexQuery = `
{  
  "posts": *[_type == "post"] | order(date desc, _updatedAt desc) {
    ${postFields}
  },
  "categories": *[_type == "category"] | order(_updatedAt desc) {
    ${categoryFields}
  }
}
`

export const categoriesQuery = `
  *[_type == "category"] | order(_updatedAt desc) {
    ${categoryFields}
  }
`

export const categoryQuery = `
  *[_type == "category" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${categoryFields}
    "posts": *[_type == "post" && references(^._id)] {
      ${postFields}
    }
  }
`

export const categorySlugsQuery = `
*[_type == "category" && defined(slug.current)][].slug.current
`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
