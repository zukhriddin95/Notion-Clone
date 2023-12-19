'use client'

import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

const TrashBox = () => {
	const router = useRouter()
	const documents = useQuery(api.document.getTrashDocuments)

	if (documents === undefined) {
		return (
			<div className='h-full flex items-center justify-center p-4'>
				<Loader size={'lg'} />
			</div>
		)
	}

	return (
		<Fragment>
			<div className='text-sm'>
				<div className='flex items-center gap-x-1 p-2'>
					<Search className='w-4 h-4' />
					<Input
						className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
						placeholder='Filter by page title...'
						//   value={search}
						//   onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className='mt-2 px-1 pb-1'>
					<p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
						No documents in trash
					</p>

					{documents.map((doc) => (
						<div
							key={doc._id}
							className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
							role='button'
						>
							<span className='truncate pl-2'>{doc.title}</span>

							<div className='flex items-center'>
								<div
									className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
									role='button'
									// onClick={() => onRestore(document._id)}
								>
									<Undo className='h-4 w-4 text-muted-foreground' />
								</div>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents in trash
        </p>

        {filteredDocuments.map((document) => (
          <div
            key={document._id}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            role="button"
            onClick={() => router.push(`/documents/${document._id}`)}
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                role="button"
                onClick={() => onRestore(document._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div> */}
		</Fragment>
	)
}

export default TrashBox
