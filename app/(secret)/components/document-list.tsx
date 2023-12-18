'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { Fragment, useState } from 'react'
import Item from './item'
import { useParams, useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'

interface DocListProps {
	parentDocumentId?: Id<'documents'>
	level: number
}

const DocumentList = ({ level = 0, parentDocumentId }: DocListProps) => {
	const [expanded, setExpanded] = useState<Record<string, boolean>>({})
	const router = useRouter()
	const params = useParams()


	const onExpanded = (documentId: string) => {
		setExpanded((prev) => ({
			...prev,
			[documentId]: !prev[documentId],
		}))
	}

	const onRedirect = (documentId: string) => {
		router.push(`/documents/${documentId}`)
	}

	const documents = useQuery(api.document.getDocuments, {
		parentDocument: parentDocumentId,
	})

	if(documents === undefined) {
		return (
			<>
			<Item.Skeleton level={level} />

			{level === 0 && (
				<>
				<Item.Skeleton level={level} />
				<Item.Skeleton level={level} />
				</>
			)}
			</>
		)
	}

	return (
		<Fragment>
			<p
				className={cn(
					'hidden text-sm font-medium text-muted-foreground/80',
					expanded && 'last:block',
					level === 0 && 'hidden'
				)}
				style={{
					paddingLeft: level ? `${level * 12 + 12}px` : "12px",
				}}
			>
				No Documents found
			</p>
			{documents.map((doc) => (
				<div key={doc._id}>
					<Item
						label={doc.title}
						id={doc._id}
						level={level}
						expanded={expanded[doc._id]}
						onExpanded={() => onExpanded(doc._id)}
						onClick={() => onRedirect(doc._id)}
						active={params.documentId === doc._id}
						DocumentIcon={doc.icon}
					/>
					{expanded[doc._id] && (
						<DocumentList parentDocumentId={doc._id} level={level + 1} />
					)}
				</div>
			))}
		</Fragment>
	)
}

export default DocumentList
