import Image from "next/future/image"
import Link from "next/link"
import { urlForImage } from "../lib/sanity"

export default function Avatar({
  name,
  picture,
  className,
  small = false,
  to,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={small ? "relative mr-2" : "relative w-12 h-12 mr-4"}>
        <Image
          src={
            picture?.asset?._ref
              ? urlForImage(picture)
                  .height(small ? 30 : 96)
                  .width(small ? 30 : 96)
                  .fit("crop")
                  .url()
              : "https://source.unsplash.com/96x96/?face"
          }
          className="rounded-full"
          height={small ? 30 : 96}
          width={small ? 30 : 96}
          alt={name}
        />
      </div>
      {to ? (
        <Link href={to}>
          <a className={small ? "font-bold" : "text-xl font-bold"}>{name}</a>
        </Link>
      ) : (
        <div className={small ? "font-bold" : "text-xl font-bold"}>{name}</div>
      )}
    </div>
  )
}
