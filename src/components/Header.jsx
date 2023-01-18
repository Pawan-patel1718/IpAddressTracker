import React from 'react'
import Arrow from '../images/icon-arrow.svg'
import background from '../images/pattern-bg.png'
export default function Header() {
    return (
        <>
            <div className='absolute w-full -z-10'>
                <img src={background} alt="" className='w-full h-60' />
            </div>
            <article className='p-7'>
                <h1 className='pb-6 text-center text-2xl lg:text-3xl text-white font-bold '>IP Address Tracker</h1>
                <form action="" className='flex justify-center '>
                    <input type="text" name='ipaddress' id='ipaddress' placeholder='Search for any IP address or domain' className='py-2 px-4 rounded-l-xl w-96 ' />
                    <button type="submit" className='hover:opacity-70 py-[13px] px-4 rounded-r-xl text-base bg-black'>
                        <img src={Arrow} alt=""  />
                    </button>
                </form>
            </article>
        </>
    )
}
