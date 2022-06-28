import React from 'react'
import { SEO } from 'subcomponents';

export default function NotFound() {
  return (
    <div>
      <SEO title="Page Not Found" />
      page not found
    </div>
  )
}

NotFound.getLayout = page => page;
