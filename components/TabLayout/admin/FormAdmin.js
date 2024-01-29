import Web3 from 'web3'
import {useEffect, useState} from 'react'
import data1 from '../../../build/contracts/MultiSigTA.json' assert {type: 'json'}
import {toast} from 'sonner'

export default function FormAdmin({user, addr, loadWalletOwners}) {
    const [addAddress, setAddAddress] = useState('')
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)
    const [removeAddress, setRemoveAddress] = useState('')
    const [currentSelectedWallet, setCurrentSelectedWallet] = useState('')

    useEffect(() => {
        const retrievedUserWalletObject = localStorage.getItem('userWalletObject')
        setCurrentSelectedWallet(retrievedUserWalletObject)
    }, [])

    const addUser = async () => {
        try {
            setLoadingAdd(true)
            const web3 = new Web3(window.web3.currentProvider)
            const networkId = await web3.eth.net.getId()
            const networkData = data1.networks?.[networkId]

            if (!networkData) {
                toast.error('Contract Multisig not deployed to detected network.')
                return
            }

            const contractInstance = new web3.eth.Contract(data1.abi, currentSelectedWallet, {
                from: user.address,
            })

            const receipt = await contractInstance.methods
                .addWalletOwner(addAddress, addr, currentSelectedWallet)
                .send({from: user.address})

            toast.success('Wallet owner has been added')
            loadWalletOwners(currentSelectedWallet)
        } catch (error) {
            console.error('Error during addUser:', error)
            toast.error('An error occurred during user addition.')
        } finally {
            setLoadingAdd(false)
        }
    }
    const removeUser = async () => {
        try {
            setLoadingRemove(true)
            const web3 = new Web3(window.web3.currentProvider)
            const networkId = await web3.eth.net.getId()
            const networkData = data1.networks?.[networkId]

            if (!networkData) {
                toast.error('Contract Multisig not deployed to detected network.')
                return
            }

            const contractInstance = new web3.eth.Contract(data1.abi, currentSelectedWallet, {
                from: user.address,
            })

            const removed = await contractInstance.methods
                .removeWalletOwner(removeAddress, addr, currentSelectedWallet)
                .send({from: user.address})

            toast.success('Wallet owner has been removed')
            loadWalletOwners(currentSelectedWallet)
        } catch (error) {
            console.error('Error during removeUser:', error)
            toast.error('An error occurred during user addition.')
        } finally {
            setLoadingRemove(false)
        }
    }
    return (
        <div className='flex flex-col md:flex-row justify-between mb-12'>
            <div className='w-full md:w-1/2 max-h-96 bg-darkmain-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-greenmain md:text-2xl dark:text-white'>
                        Add Owner
                    </h1>
                    <form>
                        {/* <div className='mb-6'>
                            <label
                                htmlFor='name_add'
                                className='block mb-2 text-md font-medium text-white dark:text-white'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name_add'
                                id='name_add'
                                className='bg-darkmain-300 border border-darkmain-300 text-greenmain sm:text-sm rounded-lg focus:ring-greenmain focus:border-greenmain block w-full p-2.5 '
                                placeholder='name'
                                required=''
                            />
                        </div> */}

                        <div className='mb-12'>
                            <label
                                htmlFor='address_add'
                                className='block mb-2 text-md font-medium text-white dark:text-white'>
                                Address
                            </label>
                            <input
                                value={addAddress}
                                onChange={e => setAddAddress(e.target.value)}
                                type='text'
                                name='address_add'
                                id='address_add'
                                className='bg-darkmain-300 border border-darkmain-300 text-greenmain sm:text-sm rounded-lg focus:ring-greenmain focus:border-greenmain block w-full p-2.5 '
                                placeholder='address'
                                required=''
                            />
                        </div>

                        <button
                            onClick={addUser}
                            disabled={loadingAdd}
                            type='button'
                            className='w-full text-dark bg-greenmain hover:bg-dark hover:text-greenmain font-medium rounded-lg text-md px-5 py-2.5 text-center '>
                            {loadingAdd ? (
                                <div className='flex justify-center items-center text-center'>
                                    <svg
                                        aria-hidden='true'
                                        role='status'
                                        className='w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
                                        viewBox='0 0 100 101'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                            fill='currentColor'
                                        />
                                        <path
                                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                            fill='#1C64F2'
                                        />
                                    </svg>
                                    Adding new owner...
                                </div>
                            ) : (
                                <div>Add Owner Wallet</div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            {/* remove */}
            <div className='w-full md:w-1/2 max-h-96 bg-darkmain-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-greenmain md:text-2xl dark:text-white'>
                        Remove Owner
                    </h1>
                    <form action='#'>
                        {/* <div className='mb-6'>
                            <label
                                htmlFor='name_remove'
                                className='block mb-2 text-md font-medium text-white dark:text-white'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name_remove'
                                id='name_remove'
                                className='bg-darkmain-300 border border-darkmain-300 text-greenmain sm:text-sm rounded-lg focus:ring-greenmain focus:border-greenmain block w-full p-2.5 '
                                placeholder='name'
                                required=''
                            />
                        </div> */}

                        <div className='mb-12'>
                            <label
                                htmlFor='address_remove'
                                className='block mb-2 text-md font-medium text-white dark:text-white'>
                                Address
                            </label>
                            <input
                                value={removeAddress}
                                onChange={e => setRemoveAddress(e.target.value)}
                                type='text'
                                name='address_remove'
                                id='address_remove'
                                className='bg-darkmain-300 border border-darkmain-300 text-greenmain sm:text-sm rounded-lg focus:ring-greenmain focus:border-greenmain block w-full p-2.5 '
                                placeholder='address'
                                required=''
                            />
                        </div>

                        <button
                            onClick={removeUser}
                            disabled={loadingRemove}
                            type='button'
                            className='w-full text-dark bg-greenmain hover:bg-dark hover:text-greenmain font-medium rounded-lg text-md px-5 py-2.5 text-center '>
                            {loadingRemove ? (
                                <div className='flex  items-center text-center justify-center'>
                                    <svg
                                        aria-hidden='true'
                                        role='status'
                                        className='w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
                                        viewBox='0 0 100 101'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                            fill='currentColor'
                                        />
                                        <path
                                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                            fill='#1C64F2'
                                        />
                                    </svg>
                                    Removing owner...
                                </div>
                            ) : (
                                <div>Remove Owner Wallet</div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
