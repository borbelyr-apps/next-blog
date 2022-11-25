import React from 'react';
import CategoryPreview from './category-preview';

const TextWithIllustration = ({excerpt, heading, image, tagline}) => {
  return (
    <CategoryPreview excerpt={excerpt} name={heading} picture={image}/>
  );
};

export default TextWithIllustration;