import React, { useState } from 'react'
import Navbar from './utilities/Navbar'
import useStateContext from '@/context/ContextProvider';


const Borrow_history = ({ app_settings }) => {

    const { setAPIloading } = useStateContext();

    const [select, set_select] = useState("all");
    const handle_select = (option) => {
        setAPIloading(true)
        setTimeout(() => {
            set_select(option);
            setAPIloading(false);
        }, 500);
    };



    return (
        <div className='w-screen min-h-screen relative bg-stone-100' >
            <Navbar app_settings={app_settings} back_btn={true} />
            <div className='w-screen overflow-x-auto flex bg-emerald-400 mt-[52px] px-[15px] pb-[5px] h-[34px] justify-between gap-8' >
                <p onClick={() => handle_select("all")} className={`text-stone-50 text-[13px] select-none relative w-[70px] text-center whitespace-nowrap ${select === "all" ? "font-semibold " : "font-normal opacity-90"}`} >
                    All
                    {select === "all" &&
                        <span className='w-full border-b-[3px] rounded-full absolute bottom-0 left-0 '></span>
                    }
                </p>


                <p onClick={() => handle_select("finished")} className={`text-stone-50 text-[13px] select-none relative w-[100px] text-center whitespace-nowrap ${select === "finished" ? "font-semibold " : "font-normal opacity-90"}`} >
                    Finished
                    {select === "finished" &&
                        <span className='w-full border-b-[3px] rounded-full absolute bottom-0 left-0 '></span>
                    }
                </p>


                <p onClick={() => handle_select("processing")} className={`text-stone-50 text-[13px] select-none relative w-[70px] text-center whitespace-nowrap ${select === "processing" ? "font-semibold " : "font-normal opacity-90"}`} >
                    Processing
                    {
                        select === "processing" &&
                        <span className='w-full border-b-[3px] rounded-full absolute bottom-0 left-0 '></span>
                    }
                </p>


            </div>

        </div>
    )
}

export default Borrow_history