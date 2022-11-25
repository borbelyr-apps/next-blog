import Head from "next/head"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Container from "../../components/container"
import MoreStories from "../../components/more-stories"
import PostHeader from "../../components/post-header"
import Layout from "../../components/layout"
import PostTitle from "../../components/post-title"
import { CMS_NAME } from "../../lib/constants"
import { pageQuery, pageSlugsQuery } from "../../lib/queries"
import { urlForImage, usePreviewSubscription } from "../../lib/sanity"
import { sanityClient, getClient } from "../../lib/sanity.server"
import Hero from "../../components/hero"
import TextWithIllustration from "../../components/text-with-illustration"
import CallToAction from "../../components/call-to-action"

const renderComponent = (component) => {
  switch (component._type) {
    case "hero":
      return <Hero key={component._key} {...component}/>
    case "textWithIllustration":
      return <TextWithIllustration key={component._key} {...component}/> 
    case "callToAction":
      return <CallToAction key={component._key} {...component}/> 
    default:
      console.log("Unknow component: ", component._type);
      break;
  }
} 

const Page = ({data = {}, preview}) => {
  const router = useRouter()
  const slug = data?.slug
  const { data: page } = usePreviewSubscription(pageQuery, {
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
                {page.title} | Next.js Blog Example with {CMS_NAME}
              </title>
              {page.picture?.asset?._ref && (
                <meta
                  key="ogImage"
                  property="og:image"
                  content={urlForImage(page.picture)
                    .width(1200)
                    .height(627)
                    .fit("crop")
                    .url()}
                />
              )}
            </Head>
            {page.pageBuilder.map((element) => renderComponent(element))}
          </>
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const result = await getClient(preview).fetch(pageQuery, {
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
  const paths = await sanityClient.fetch(pageSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export default Page;