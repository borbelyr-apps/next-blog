import CoverImage from "./cover-image";

export default function Hero({
  heading,
  tagline,
  image,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={heading} image={image} priority />
      </div>
      <div className="mb-20 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 md:mb-28">
        <div>
          <h1 className="mb-4 text-4xl leading-tight lg:text-6xl">
          {heading}
          </h1>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{tagline}</p>
        </div>
      </div>
    </section>
  )
}