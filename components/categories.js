import Link from "next/link"
import CategoryPreview from "../components/category-preview"

export default function Categories({ categories }) {
  return (
    <section className="mb-16">
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          Categories.
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 md:gap-y-8 mb-16">
        {categories.map((category) => (
          <CategoryPreview
            key={category.slug}
            {...category}
          />
        ))}
      </div>
    </section>
  )
}