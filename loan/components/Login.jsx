import React, { useEffect, useState } from 'react'
import Navbar from './utilities/Navbar'
import Image from 'next/image'
import login_vector from "@/public/images/login_vector.png";
import { FaCheck } from "react-icons/fa6";
import { setCookie } from 'cookies-next';
import useStateContext from '@/context/ContextProvider';
import { useRouter } from 'next/router';

const Login = ({ app_settings }) => {

    const { setAPIloading } = useStateContext();


    const router = useRouter();

    const [animation, set_animation] = useState(true);

    const handle_btn = (mock) => {
        setAPIloading(true);
        // cookie expires in 1 days
        const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        // now setting that user in cookies
        setCookie("user_account", "user is logged in!", { expires: expiryDate });

        setTimeout(() => {
            if (!mock) {
                router.push("/");

            } else {
                setAPIloading(false);
            }
        }, 600)
    }

    useEffect(() => {

        setTimeout(() => {
            set_animation(false);
        }, 3000)
    }, [])

    return (
        <div className='w-screen min-h-[calc(100vh-52px)] relative bg-emerald-400' >
            <Navbar app_settings={app_settings} disable_headset={true} />
            <div className='flex flex-col mt-[52px] w-full min-h-[calc(100vh-52px)] justify-center'>

                <div className='flex-[2.6] bg-emerald-400 relative' >
                    <div className='absolute bottom-[-60px] w-[90%] left-0 right-0  mx-auto'>
                        <Image src={login_vector} alt="loan_vector" className='object-contain' />
                    </div>
                </div>

                <div className='flex-1 bg-stone-50  rounded-t-2xl px-[20px] py-[25px] z-10 flex-col flex gap-5' >
                    <p className='text-[15px] text-stone-800 font-normal' >Hello, welcome to {app_settings && app_settings.app_name}</p>

                    {animation ?
                        <div className='flex w-full flex-col gap-2' >
                            <div className='flex items-center gap-2 bg-emerald-50 rounded-lg px-[10px] py-[15px] text-[14px] font-normal text-stone-600' >
                                +91
                                <input value={{}} type="number" className='outline-none bg-inherit w-full caret-stone-400' placeholder='Please enter a telephone number' />
                            </div>

                            <p className='text-[12px] text-stone-400 font-normal' >Phone number (e.g. xxxxxxxxxx)</p>
                        </div>
                        :
                        <div className='flex items-center justify-center gap-3 bg-emerald-100 rounded-xl px-[10px] py-[25px] text-[15px] font-normal text-zinc-400 mb-2' >
                            Your login information is saved

                            <div className='bg-white p-[5px] rounded-md text-emerald-400' >
                                <FaCheck />
                            </div>

                        </div>
                    }


                    {animation ?
                        <button className='text-white text-[17px] font-normal bg-stone-200 py-[14px] rounded-2xl' >
                            Next step
                        </button>
                        :
                        <button onClick={() => handle_btn()} className='text-white text-[17px] font-normal bg-emerald-400 py-[14px] rounded-2xl active:opacity-60 transition-all' >
                            Login
                        </button>
                    }

                    <p className='text-[12px] text-stone-400 font-normal' >Signing in means you agree to the <span onClick={() => handle_btn("mock")} className='text-emerald-400' >{`{{ Privacy Policy }}`}</span></p>
                </div>
            </div>

        </div>
    )
}

export default Login