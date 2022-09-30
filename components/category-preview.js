import CoverImage from "./cover-image"
import Link from "next/link"

export default function CategoryPreview({
  name,
  picture,
  description,
  slug,
}) {
  return (
    <div key={slug}>
      <div className="mb-5">
        <CoverImage slug={slug} title={name} image={picture} part="categories"/>
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/categories/${slug}`}>
          <a className="underline-link">{name}</a>
        </Link>
      </h3>
      <p className="mb-4 text-lg leading-relaxed">{description}</p>
    </div>
  )
}
