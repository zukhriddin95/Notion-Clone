"use client"

import { Id } from '@/convex/_generated/dataModel'
import React from 'react'

interface DocIdProps {
	params: {
		documentId: Id<"documents">
	}
}

const DocumentId = ({params}: DocIdProps) => {
  return (
	<div>DocumentId: {params.documentId}</div>
  )
}

export default DocumentId