'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const DocumentPage = () => {
	const { user } = useUser()
	const router = useRouter()
	const createDocument = useMutation(api.document.createDocument)

	const onCreateDocument = () => {
		const promise = createDocument({
			title: 'Untitled',
		}).then((docId) => router.push(`/documents/${docId}`))

		toast.promise(promise, {
			loading: 'creating a new blank . . .',
			success: 'created a new blank . . .',
			error: 'failed to create a blank . . .',
		})
	}

	return (
		<div className='h-screen w-full flex justify-center items-center space-y-4 flex-col'>
			<Image
				src={'/note.svg'}
				alt='Logo'
				width={300}
				height={300}
				className='object-cover dark:hidden'
			/>
			<Image
				src={'/note-dark.svg'}
				alt='Logo'
				width={300}
				height={300}
				className='hidden object-cover dark:block'
			/>
			<h1 className='text-lg font-bold'>
				Welcome to {user?.firstName}`s document page
			</h1>
			<Button onClick={onCreateDocument}>
				<Plus className='h-4 w-4 mr-2' />
				Create a blank
			</Button>
		</div>
	)
}

export default DocumentPage
