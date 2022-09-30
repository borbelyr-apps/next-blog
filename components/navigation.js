import React from "react"
import Image from "next/image"
import Link from "next/link"

import Container from "./container"
import TransparentLogo from "../assets/images/logo_transparent.png"

const Navigation = () => {
  return (
    <nav className="py-5">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="w-20 inline-block">
                <Image  src={TransparentLogo} alt="InSanity logo" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/categories">
              <a className="mr-5 text-lg">
                Categories.
              </a>
            </Link>
            <Link href="/stories">
              <a className=" text-lg">
                Stories.
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navigation
