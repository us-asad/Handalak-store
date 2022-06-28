import Head from 'next/head'
import React from 'react'

export default function SEO({title, description}) {
  return (
    <Head>
      <title>{`${title} - Handalak Store`}</title>
      <meta name='description' content={description || "Handalak Store"} />
    </Head>
  )
}
