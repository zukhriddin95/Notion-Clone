'use client'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { ChevronsLeft, MenuIcon, Plus, Rocket, Search, Settings } from 'lucide-react'
import { ElementRef, Fragment, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import DocumentList from './document-list'
import Item from './item'
import UserBox from './user-box'
import { Progress } from '@/components/ui/progress'

const Sidebar = () => {
	const isMobile = useMediaQuery('(max-width: 770px)')
	const sidebarRef = useRef<ElementRef<'div'>>(null)
	const navbarRef = useRef<ElementRef<'div'>>(null)
	const isResizing = useRef(false)
	const [isCollapsed, setIsCollapsed] = useState(isMobile)
	const [isResetting, setIsResetting] = useState(false)
	const createDocument = useMutation(api.document.createDocument)

	useEffect(() => {
		if (isMobile) {
			collapse()
		} else {
			reset()
		}
	}, [isMobile])

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true)
			setIsResetting(true)
			sidebarRef.current.style.width = '0'
			navbarRef.current.style.width = '100%'
			navbarRef.current.style.left = '0'
			setTimeout(() => setIsResetting(false), 300)
		}
	}
	const reset = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false)
			setIsResetting(true)

			sidebarRef.current.style.width = isMobile ? '100%' : '240px'
			navbarRef.current.style.width = isMobile ? '0px' : 'calc(100% - 240px)'
			navbarRef.current.style.left = isMobile ? '100%' : '240px'
			setTimeout(() => setIsResetting(false), 300)
		}
	}

	const handeMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()

		isResizing.current = true
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizing.current) return

		let mewWidth = event.clientX

		if (mewWidth < 240) mewWidth = 240
		if (mewWidth > 500) mewWidth = 500

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${mewWidth}px`
			navbarRef.current.style.left = `${mewWidth}px`
			navbarRef.current.style.width = `calc(100% - ${mewWidth}px)`
		}
	}

	const handleMouseUp = () => {
		isResizing.current = false
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mousemove', handleMouseUp)
	}

	const onCreateDocument = () => {
		createDocument({
			title: 'Untitled',
		})
	}
	return (
		<Fragment>
			<div
				className={cn(
					'group/sidebar h-screen bg-secondary overflow-y-auto flex w-60 flex-col z-50 sticky left-0 top-0',
					isResetting && 'transition-all ease-in duration-300',
					isMobile && 'w-0 duration-300'
				)}
				ref={sidebarRef}
			>
				<div
					className={cn(
						'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
						isMobile && 'opacity-100'
					)}
					role='button'
					onClick={collapse}
				>
					<ChevronsLeft className='h-6 w-6' />
				</div>

				<div className=''>
					<UserBox />
					<Item label='Search' icon={Search} />
					<Item label='Setting' icon={Settings} />
					<Item label='New Document' icon={Plus} onClick={onCreateDocument} />
				</div>

				<div className='mt-4'>
					<DocumentList level={0} />
					<Item onClick={onCreateDocument} icon={Plus} label='Add a page' />
				</div>

				<div
					className=' absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition-opacity'
					onMouseDown={handeMouseDown}
				/>

				<div className='absolute bottom-0 px-2 bg-white/50 dark:bg-black/50 py-4 w-full'>
				<div className="flex justify-between items-center">
				<div className="flex items-center gap-1 text-[13px]">
                  <Rocket />
                  <p className="opacity-70 font-bold">Free  plan</p>
                </div>
				<p className='text-[13px] opacity-70'>1/3</p>
				</div>
				<Progress
                //   value={
                //     documents?.length && documents.length >= 3
                //       ? 100
                //       : (documents?.length || 0) * 33.33
                //   }
                  className="mt-2"
                />
				</div>
			</div>
			<div
				className={cn(
					'absolute top-0 z-50 left-60 w-[calc(100% - 240px )]',
					isResetting && 'transition-all ease-in duration-300',
					isMobile && 'w-full left-0'
				)}
				ref={navbarRef}
			>
				<nav className='bg-transparent px-3 py-2 w-full'>
					{isCollapsed && (
						<MenuIcon
							className='h-6 w-6 text-muted-foreground '
							role='button'
							onClick={reset}
						/>
					)}
				</nav>
			</div>
		</Fragment>
	)
}

export default Sidebar
