import Head from "next/head"

import Container from "../components/container"
import Layout from "../components/layout"
import { CMS_NAME } from "../lib/constants"
import { categoriesQuery } from "../lib/queries"
import { usePreviewSubscription } from "../lib/sanity"
import { getClient, overlayDrafts } from "../lib/sanity.server"
import Intro from "../components/intro"
import Categories from "../components/categories"

export default function CategoriesPage({ allCategories: initialAllCategories, preview }) {
  const { data: allCategories } = usePreviewSubscription(categoriesQuery, {
    initialData: initialAllCategories,
    enabled: preview,
  })
  const categories = allCategories || []
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro title={'Categories.'}/>
          <Categories categories={categories} showTitle={false} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const result = await getClient(preview).fetch(categoriesQuery)
  const allCategories = overlayDrafts(result)
  return {
    props: { allCategories, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}
