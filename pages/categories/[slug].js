import Head from "next/head"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Container from "../../components/container"
import PostBody from "../../components/post-body"
import MoreStories from "../../components/more-stories"
import PostHeader from "../../components/post-header"
import SectionSeparator from "../../components/section-separator"
import Layout from "../../components/layout"
import PostTitle from "../../components/post-title"
import { CMS_NAME } from "../../lib/constants"
import { categoryQuery, categorySlugsQuery, postQuery } from "../../lib/queries"
import { urlForImage, usePreviewSubscription } from "../../lib/sanity"
import { sanityClient, getClient, overlayDrafts } from "../../lib/sanity.server"

export default function Category({ data = {}, preview }) {
  const router = useRouter()
  const slug = data?.slug
  const { data: category } = usePreviewSubscription(categoryQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Head>
              <title>
                {category.name} | Next.js Blog Example with {CMS_NAME}
              </title>
              {category.picture?.asset?._ref && (
                <meta
                  key="ogImage"
                  property="og:image"
                  content={urlForImage(category.picture)
                    .width(1200)
                    .height(627)
                    .fit("crop")
                    .url()}
                />
              )}
            </Head>
            <PostHeader
              title={`${category.name}.`}
              coverImage={category.picture}
            />
            <p className = "text-xl">{category.description}</p>
            <hr className="border-accent-2 mt-8 mb-14" />
            {category.posts.length > 0 && (
              <MoreStories posts={category.posts} showTitle={false}/>
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const result = await getClient(preview).fetch(categoryQuery, {
    slug: params.slug,
  })
  console.log('Results: ', result)
  return {
    props: {
      preview,
      data: {
        ...result,
        // morePosts: overlayDrafts(morePosts),
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(categorySlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
