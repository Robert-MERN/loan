import React from 'react'
import Navbar from './utilities/Navbar'
import useStateContext from '@/context/ContextProvider'
import { useState } from 'react'



const Admin = ({ app_settings }) => {

    const { handle_update_app_settings } = useStateContext()

    const default_State = {
        app_name: "",
        loan_amount: "",
        upi_id: "",
        lenders: "",
        repayment_time: "",
        user_name: "",
        pan_card: "",
        code: "",
    }


    const [values, set_values] = useState(default_State);


    const handle_change = (e) => {
        const { name, value } = e.target;
        set_values(prev => ({ ...prev, [name]: value }));
    }

    const delete_empty_pairs = (obj) => {
        const object = { ...obj }
        for (const each of Object.keys(obj)) {
            if (!obj[each]) {
                delete object[each];
            }
        }
        return object;
    }
    const set_default_states = () => {
        set_values(default_State);
    }
    const handle_update = async (e) => {
        e.preventDefault()
        const { code, ...rest } = values;
        const settings = delete_empty_pairs(rest);
        handle_update_app_settings(settings, code, set_default_states);
    }

    return (
        <div className='w-screen min-h-screen relative bg-stone-100 flex justify-center' >
            <Navbar app_settings={app_settings} back_btn={true} disable_headset={true} admin={true} />

            <form onSubmit={handle_update} className='w-full lg:w-[600px] lg:rounded-lg flex flex-col gap-6 px-[30px] mt-[52px] py-[30px]' >
                <div className='w-full flex flex-col gap-1' >
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">App Name</label>
                    < input
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        placeholder='Name'
                        type="text"
                        name="app_name"
                        value={values.app_name}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">Loan Amount</label>
                    < input
                        placeholder='00.00'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="loan_amount"
                        value={values.loan_amount}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">UPI ID</label>
                    < input
                        placeholder='ID'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="upi_id"
                        value={values.upi_id}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">Lenders</label>
                    < input
                        placeholder='Lenders'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="lenders"
                        value={values.lenders}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">Repayment Time</label>
                    < input
                        placeholder='DD-MM-YYYY'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="repayment_time"
                        value={values.repayment_time}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">User Name</label>
                    < input
                        placeholder='Name'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="user_name"
                        value={values.user_name}
                        onChange={handle_change}
                    />

                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">Pan Card</label>
                    < input
                        placeholder='xxxxxxxxxxx'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="pan_card"
                        value={values.pan_card}
                        onChange={handle_change}
                    />
                </div>


                <div className='w-full flex flex-col gap-1'>
                    <label className='text-[13px] font-bold text-stone-700' htmlFor="">Code</label>
                    < input
                        placeholder='******'
                        type="text"
                        className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none'
                        name="code"
                        value={values.code}
                        onChange={handle_change}
                    />
                </div>

                <div className='w-full mt-4'>
                    <button type='submit' className='bg-emerald-400 text-[13px] text-white px-[10px] py-[10px] rounded-lg font-medium active:opacity-60 transition-all w-full' >Update</button>
                </div>

            </form>
        </div>
    )
}

export default Admin