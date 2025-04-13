'use client'

import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main>
            <h1 className='bg-black text-white'>Hello BNS!</h1>
            <span className='text-xs font-bold text-blue-400'>{process.env.NEXT_PUBLIC_API_URL} </span>
        </main>
    )
}

export default HomePage
