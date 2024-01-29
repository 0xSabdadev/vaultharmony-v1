import {useState} from 'react'
import ModalHistory from './ModalHistory'

export default function HistoryCancel({listCancel}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [idTx, setIdTx] = useState('')

    const openModal = event => {
        const clickedButtonId = event.target.id
        setIdTx(clickedButtonId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className='pt-0 pb-0  mx-auto max-w-screen-xl  lg:pb-16 z-10 relative mb-3'>
            <h1 className='text-center  text-xl font-extrabold font-roboto tracking-tight leading-none text-greenmain   md:text-2xl dark:text-white mb-6'>
                Cancel Histroy
            </h1>
            <div className='relative overflow-x-auto  sm:rounded-lg'>
                <table className='font-roboto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-md text-white uppercase bg-darkmain-300 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Token
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Receiver Address
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Sender Address
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Amount
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                <span className='sr-only'>Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listCancel) ? (
                            listCancel.map((wallet, idx) => (
                                <tr
                                    key={idx}
                                    className='rounded-lg bg-darkmain-800 border-4 border-darkmain-300 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600'>
                                    <th
                                        scope='row'
                                        className='rounded-l-xl px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white'>
                                        {wallet.returnValues.ticker}
                                    </th>

                                    <td className='px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white'>
                                        <span className='bg-greendark text-greenmain rounded-full  px-3 py-2'>
                                            {wallet.returnValues.receiver}
                                        </span>
                                    </td>

                                    <td className='px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white'>
                                        <span className='bg-greendark text-greenmain rounded-full  px-3 py-2'>
                                            {wallet.returnValues.sender}
                                        </span>
                                    </td>

                                    <td className='px-6 py-4 text-white'>
                                        {(wallet.returnValues.amount / 10 ** 18).toFixed(2)}
                                    </td>
                                    <td className=' rounded-r-xl px-6 py-4 text-right'>
                                        <button
                                            onClick={openModal}
                                            id={idx}
                                            className='font-medium text-greenmain dark:text-blue-500 hover:underline'>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='3' className='px-6 py-4 text-white text-center'>
                                    Invalid data format
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalHistory
                isOpen={isModalOpen}
                onClose={closeModal}
                idTx={idTx}
                listDepo={listCancel}
                header={'Cancel'}
            />
        </div>
    )
}
