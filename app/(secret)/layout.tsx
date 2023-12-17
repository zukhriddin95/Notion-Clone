'use client'
import Loader from '@/components/ui/loader'
import { childrenProps } from '@/types'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import Sidebar from './components/sidebar'

const SecretLayout = ({ children }: childrenProps) => {
	const { isAuthenticated, isLoading } = useConvexAuth()

	if (isLoading) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<Loader size={'lg'} />
			</div>
		)
	}

	if (!isAuthenticated) {
		return redirect('/')
	}

	return (
		<div className='flex gap-2 w-full'>
			<Sidebar />
			<main>{children}</main>
		</div>
	)
}

export default SecretLayout
