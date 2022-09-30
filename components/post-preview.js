import Avatar from "../components/avatar"
import Date from "../components/date"
import CoverImage from "./cover-image"
import Link from "next/link"

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} image={coverImage} part="stories"/>
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/stories/${slug}`}>
          <a className="underline-link">{title}</a>
        </Link>
      </h3>
      <div className="flex items-center mb-4">
        {category ? (
          <Avatar
            name={category.name}
            picture={category.picture}
            small
            to={`/categories/${category.slug}`}
          />
        ) : null}
        {category ? <span className="mx-2">|</span> : null}
        <div className=" text-lg">
          <Date dateString={date} />
        </div>
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
