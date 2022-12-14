import Head from "next/head"

import Container from "../components/container"
import MoreStories from "../components/more-stories"
import HeroPost from "../components/hero-post"
import Intro from "../components/intro"
import Layout from "../components/layout"
import { CMS_NAME } from "../lib/constants"
import { indexQuery } from "../lib/queries"
import { usePreviewSubscription } from "../lib/sanity"
import { getClient, overlayDrafts } from "../lib/sanity.server"
import Categories from "../components/categories"

export default function Index({ data: initialAllPosts, preview }) {
  const { data: result } = usePreviewSubscription(indexQuery, {
    initialData: initialAllPosts,
    enabled: preview,
  })
  const { posts, categories } = result
  const [heroPost, ...morePosts] = posts || []
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro title={"Blog."} />
          {heroPost && <HeroPost {...heroPost} />}
          {categories.length > 0 && <Categories categories={categories} />}
          {morePosts.length > 0 && <MoreStories posts={morePosts} limit={2} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const { posts, categories } = await getClient(preview).fetch(indexQuery)
  const allPosts = overlayDrafts(posts)
  const allCategories = overlayDrafts(categories)
  return {
    props: { data: { posts: allPosts, categories: allCategories }, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}
