import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../App'
import { Payment } from '../axios'

function Cart() {
    const { CartStore, SetCartStore } = useContext(StoreContext)
    const Pay = () => {
        return CartStore.reduce((currenValue, nextValue) => {
            return (currenValue + nextValue.count * nextValue.price)
        }, 0)
    }
    const clear = () => {
        localStorage.clear()
        SetCartStore([])
    }
    const [Qr, SetQr] = useState([])
    useEffect(() => {
        Payment({ amount: Pay() })
            .then(res => {
                SetQr(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])
    const QRCode = () => {
        if (Pay() === 0) { return null }
        else { return Qr }
    }
    return (
        <div>
            <div className="p-4 bg-red-300 m-1 rounded-md grid grid-cols-5">
                <div className="text-xl font-bold col-span-3">
                    PhongphathShope
                </div>
                <div>
                    <button className='ml-10 inline-flex items-center px-2 font-medium bg-red-500 rounded-lg text-white'
                        onClick={() => { clear() }}
                    >ล้าง</button>
                </div>
                <Link className="flex ml-7" to='/'>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                </Link>
            </div>
            <div className="bg-orange-200 p-4 m-1 rounded-md  min-h-[46rem]">
                <table className="grid justify-items-center">
                    {CartStore.map((item, index) =>
                        <div key={index} className="mb-2 p-4 border border-gray-200 rounded-lg bg-emerald-100 box-content w-32">
                            <img className="" alt='' src={item.image} />
                            <div className="font-bold text-sm">{item.name}</div>
                            <div className=' text-sm'>{item.details}</div>
                            <div className="font-bold  text-sm">{item.price}</div>
                            <div className='font-bold text-sm text-red-400'>{item.count}</div>
                            <div className='font-bold text-sm text-sky-500'>{item.pcs}</div>
                        </div>
                    )}
                    <div className=" p-4 bg-red-300 m-1 rounded-md ">
                        <div className='text-center font-bold '>ราคารวม {Pay()} ฿</div>
                        <div className='m-4 grid justify-items-center rounded-md bg-white '>
                            <img className='w-42' alt='' src={QRCode()} />
                        </div>
                    </div>
                </table>
            </div>
        </div>
    )
}

export default Cart