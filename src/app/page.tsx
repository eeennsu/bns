'use client'

import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main>
            <h1 className='bg-black text-white'>Hello BNS!</h1>
            <h2>이제 시작이야 ~ 내꿈을 ~~ 피!까츄~ 언제언제 까지나~</h2>
            <span className='text-xs font-bold text-blue-400'>{process.env.NEXT_PUBLIC_API_URL} </span>
            hello world!!! update! second update!!
        </main>
    )
}

export default HomePage
