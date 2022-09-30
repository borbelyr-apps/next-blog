import Link from "next/link"
import PostPreview from "../components/post-preview"

export default function MoreStories({ posts, limit, showTitle = true }) {
  return (
    <section className="mb-16">
      {showTitle ? (
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Stories
        </h2>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-16 gap-y-16 md:gap-y-16 mb-16">
        {posts.slice(0, limit).map((post) => (
          <PostPreview
            key={post.slug}
            {...post}
          />
        ))}
      </div>
      {posts.length > limit ? (
        <div className="text-center w-full">
          <Link href="/stories">
            <a className="text-xl inline-block underline-link">
              Read more stories...
            </a>
          </Link>
        </div>
      ) : null}
    </section>
  )
}
