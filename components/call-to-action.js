import Link from 'next/link';
import React from 'react';

const CallToAction = ({linkText, url}) => {
  return (
    <section className='bg-black text-center text-white p-8'>
      <Link  href={url}>
        <a className="text-5xl">{linkText}</a>
      </Link>
    </section>
  );
};

export default CallToAction;