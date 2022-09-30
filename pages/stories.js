import Head from "next/head"

import Container from "../components/container"
import MoreStories from "../components/more-stories"
import Layout from "../components/layout"
import { CMS_NAME } from "../lib/constants"
import { indexQuery } from "../lib/queries"
import { usePreviewSubscription } from "../lib/sanity"
import { getClient, overlayDrafts } from "../lib/sanity.server"
import Intro from "../components/intro"

export default function StoriesPage({ allPosts: initialAllPosts, preview }) {
  const { data: allPosts } = usePreviewSubscription(indexQuery, {
    initialData: initialAllPosts,
    enabled: preview,
  })
  const posts = allPosts || []
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro title={'Stories.'}/>
          <MoreStories posts={posts} showTitle={false} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  return {
    props: { allPosts, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}
