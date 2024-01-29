import {MetaMaskConnector} from 'wagmi/connectors/metaMask'
import {getSession, signIn} from 'next-auth/react'
import {useAccount, useConnect, useSignMessage, useDisconnect} from 'wagmi'
import {useRouter} from 'next/router'
import {useAuthRequestChallengeEvm} from '@moralisweb3/next'
import {toast} from 'sonner'
import {useEffect, useState} from 'react'
import Head from 'next/head'

function SignIn() {
    const {connectAsync} = useConnect()
    const {disconnectAsync} = useDisconnect()
    const {isConnected} = useAccount()
    const {signMessageAsync} = useSignMessage()
    const {requestChallengeAsync} = useAuthRequestChallengeEvm()
    const {push} = useRouter()
    const [loading, setLoading] = useState(false)

    const handleAuth = async () => {
        setLoading(true)
        if (isConnected) {
            await disconnectAsync()
        }

        // redirect user after success authentication to '/' page
        try {
            const {account, chain} = await connectAsync({connector: new MetaMaskConnector()})

            const {message} = await requestChallengeAsync({address: account, chainId: chain.id})

            const signature = await signMessageAsync({message})
            const {url} = await signIn('moralis-auth', {
                message,
                signature,
                redirect: false,
                callbackUrl: '/',
            })
            /**
             * instead of using signIn(..., redirect: "/user")
             * we get the url from callback and push it to the router to avoid page refreshing
             */
            toast.success('Successfully signed in')
            push(url)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>VaultHarmony - Welcome</title>
            </Head>
            <section className='bg-darkmain-800 min-h-screen flex items-center justify-center px-3 md:px-0'>
                <div className='bg-darkmain-500 flex rounded-2xl shadow-lg max-w-3xl px-0 py-24 md:px-5 md:py-5  items-center'>
                    <div className='md:w-1/2 px-8 md:px-16'>
                        <img
                            src='https://res.cloudinary.com/kabupaten-sukoharjo/image/upload/v1705749248/logox_gevszy.png'
                            alt=''
                        />
                        <p className='font-roboto text-md md:text-sm mt-4 text-justify text-greenmain'>
                            the forefront in Ethereum's account abstraction, is a cutting-edge
                            decentralized application (dApp) delivering the pinnacle of security
                            through its implementation of a 3of3 multisignature smart contract.
                            Vault Harmony ensures the utmost protection for your digital assets on
                            the Ethereum blockchain.
                        </p>

                        <div className='mt-6 grid grid-cols-3 items-center text-white'>
                            <hr className='border-white' />
                            <p className='font-roboto text-center text-md md:text-sm'>LAUNCH</p>
                            <hr className='border-white' />
                        </div>
                        <button
                            onClick={handleAuth}
                            disabled={loading}
                            type='button'
                            id='login'
                            className='bg-greenmain  py-2 w-full rounded-xl mt-5 flex justify-center font-bold items-center text-md md:text-sm hover:scale-105 duration-300 font-roboto text-black'>
                            {loading ? (
                                <div className='flex items-center'>
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
                                    Wait a second...
                                </div>
                            ) : (
                                <div className='flex items-center'>
                                    <svg
                                        aria-hidden='true'
                                        className='w-6 h-5 me-2 -ms-1'
                                        viewBox='0 0 2405 2501'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <g clipPath='url(#clip0_1512_1323)'>
                                            <path
                                                d='M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z'
                                                fill='#E2761B'
                                                stroke='#E2761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z'
                                                fill='#E2761B'
                                                stroke='#E2761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z'
                                                fill='#C0AD9E'
                                                stroke='#C0AD9E'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z'
                                                fill='#E2761B'
                                                stroke='#E2761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z'
                                                fill='#E4751F'
                                                stroke='#E4751F'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z'
                                                fill='#233447'
                                                stroke='#233447'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z'
                                                fill='#C0AD9E'
                                                stroke='#C0AD9E'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z'
                                                fill='#D7C1B3'
                                                stroke='#D7C1B3'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z'
                                                fill='#E4761B'
                                                stroke='#E4761B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z'
                                                fill='#D7C1B3'
                                                stroke='#D7C1B3'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z'
                                                fill='#CD6116'
                                                stroke='#CD6116'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z'
                                                fill='#E4751F'
                                                stroke='#E4751F'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z'
                                                fill='#233447'
                                                stroke='#233447'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z'
                                                fill='#763D16'
                                                stroke='#763D16'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z'
                                                fill='#C0AD9E'
                                                stroke='#C0AD9E'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z'
                                                fill='#E4751F'
                                                stroke='#E4751F'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z'
                                                fill='#E4751F'
                                                stroke='#E4751F'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z'
                                                fill='#F6851B'
                                                stroke='#F6851B'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z'
                                                fill='#C0AD9E'
                                                stroke='#C0AD9E'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z'
                                                fill='#C0AD9E'
                                                stroke='#C0AD9E'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z'
                                                fill='#161616'
                                                stroke='#161616'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z'
                                                fill='#161616'
                                                stroke='#161616'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z'
                                                fill='#161616'
                                                stroke='#161616'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z'
                                                fill='#161616'
                                                stroke='#161616'
                                                strokeWidth='5.94955'
                                            />
                                            <path
                                                d='M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z'
                                                fill='#161616'
                                                stroke='#161616'
                                                strokeWidth='5.94955'
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id='clip0_1512_1323'>
                                                <rect
                                                    width='2404'
                                                    height='2500'
                                                    fill='white'
                                                    transform='translate(0.519043 0.132812)'
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Connect with MetaMask
                                </div>
                            )}
                        </button>
                    </div>

                    <div className='md:block hidden w-1/2'>
                        <img
                            className='rounded-2xl'
                            src='https://res.cloudinary.com/kabupaten-sukoharjo/image/upload/v1705748140/developed_by_Jason_Al_Hilal_bzfz78.png'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default SignIn