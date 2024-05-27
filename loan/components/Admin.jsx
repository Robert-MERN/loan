import React, { useEffect } from 'react'
import Navbar from './utilities/Navbar'
import useStateContext from '@/context/ContextProvider'
import { useState } from 'react'



const Admin = ({ app_settings, device_info }) => {

    const {
        handle_update_app_settings,
        handle_user_device_info,
        handle_update_myloan,
        handle_get_myloans,
        all_myloans,
        loan_id,
        set_loan_id,
        openModal,
    } = useStateContext();

    const [customize, set_customize] = useState("app_customization");

    useEffect(() => {

        if (customize === "loan_customization") {
            handle_get_myloans();
        };

    }, [customize]);

    const default_State = {
        app_name: "",
        upi_id: "",
        user_name: "",
        pan_card: "",
        phone_number: "",
        code: "",
    }

    const default_State_2 = {
        loan_amount: "",
        lenders: "",
        repayment_time: "",
        code: "",
    }


    const [values, set_values] = useState(default_State);

    const [values_2, set_values_2] = useState(default_State_2);


    const handle_change = (e) => {
        const { name, value } = e.target;
        set_values(prev => ({ ...prev, [name]: value }));
    };

    const handle_change_2 = (e) => {
        const { name, value } = e.target;
        set_values_2(prev => ({ ...prev, [name]: value }));
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

    const set_default_states_2 = () => {
        set_values_2(default_State_2);
    }

    const handle_update = async (targ, val) => {
        const { code, ...rest } = val;
        const settings = delete_empty_pairs(rest);
        if (targ === "app") {
            handle_update_app_settings(settings, code, set_default_states, device_info, handle_user_device_info);
        } else {
            var _id = "";
            if (!loan_id) {
                _id = all_myloans[0]._id;
            } else {
                _id = loan_id
            }
            handle_update_myloan(_id, settings, code, set_default_states_2, device_info, handle_user_device_info);
        }
    }

    return (
        <div className='w-screen min-h-screen relative bg-stone-100 flex justify-center' >
            <Navbar app_settings={app_settings} back_btn={true} disable_headset={true} admin={true} />

            <form className='w-full lg:w-[600px] lg:rounded-lg flex flex-col gap-6 px-[30px] mt-[52px] py-[30px]' >

                <div className='w-full flex justify-between mb-5' >
                    <button
                        type='button'
                        onClick={() => set_customize("app_customization")}
                        className={`w-full active:opacity-60 py-[9px] rounded-s-md  text-[12px] md:text-[15px] transition-all font-semibold ${customize === "app_customization" ? "bg-emerald-500 hover:bg-emerald-400 text-white" : "bg-stone-400 hover:bg-stone-500 text-white"}`}
                    >
                        App Settings
                    </button>

                    <button
                        type="button"
                        onClick={() => set_customize("loan_customization")}
                        className={`w-full active:opacity-60 py-[9px] rounded-e-md text-[12px] md:text-[15px] transition-all font-semibold ${customize === "loan_customization" ? "bg-emerald-500 hover:bg-emerald-400 text-white" : "bg-stone-400 hover:bg-stone-500 text-white"}`}
                    >
                        Loan Settings
                    </button>
                </div>

                {customize === "app_customization" ?
                    <>

                        <div className='w-full flex flex-col gap-1' >
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">App Name</label>
                            < input
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                placeholder='Name'
                                type="text"
                                name="app_name"
                                value={values.app_name}
                                onChange={handle_change}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">UPI ID</label>
                            < input
                                placeholder='ID'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="upi_id"
                                value={values.upi_id}
                                onChange={handle_change}
                            />
                        </div>

                        {/* <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Phone Number</label>
                            <div className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none flex items-center gap-2'>
                                <p className='font-semibold text-stone-500' >+91</p>
                                < input
                                    placeholder='Phone number'
                                    type="tel"
                                    className=' outline-none w-full'
                                    name="phone_number"
                                    value={values.phone_number}
                                    onChange={handle_change}
                                />
                            </div>
                        </div> */}

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">User Name</label>
                            < input
                                placeholder='Name'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
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
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
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
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="code"
                                value={values.code}
                                onChange={handle_change}
                            />
                        </div>
                    </>
                    :
                    <>

                        <div className='w-full flex flex-col gap-1' >
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Select Loan</label>
                            < select
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full cursor-pointer'
                                onChange={(e) => { set_loan_id(e.target.value) }}
                            >
                                {Boolean(all_myloans.length) &&
                                    all_myloans.map((each, index) => (
                                        <option key={index} value={each._id}> {`My-Loan ${index + 1}`}</option>

                                    ))
                                }

                            </select>
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Loan Amount</label>
                            < input
                                placeholder='00.00'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="loan_amount"
                                value={values_2.loan_amount}
                                onChange={handle_change_2}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Lenders</label>
                            < input
                                placeholder='Lenders'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="lenders"
                                value={values_2.lenders}
                                onChange={handle_change_2}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Repayment Time</label>
                            < input
                                placeholder='DD-MM-YYYY'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="repayment_time"
                                value={values_2.repayment_time}
                                onChange={handle_change_2}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label className='text-[13px] font-bold text-stone-700' htmlFor="">Code</label>
                            < input
                                placeholder='******'
                                type="text"
                                className='text-[14px] font-medium text-stone-700 bg-white px-[15px] py-[10px] rounded-md border border-stone-200 outline-none w-full'
                                name="code"
                                value={values_2.code}
                                onChange={handle_change_2}
                            />
                        </div>
                    </>
                }



                {customize === "app_customization" ?
                    <div className='w-full mt-4'>
                        <button type='button' onClick={() => handle_update("app", values)} className='bg-emerald-400 text-[13px] text-white px-[10px] py-[10px] rounded-lg font-medium active:opacity-60 transition-all w-full' >Update</button>
                    </div>
                    :
                    <>
                        <div className='w-full flex justify-center gap-10'>

                            <div className='w-full flex justify-center gap-4' >

                                <div className='w-full mt-4'>
                                    <button type='button' onClick={() => { handle_update("loan", values_2) }} className='bg-emerald-400 text-[13px] text-white px-[10px] py-[10px] rounded-lg font-medium active:opacity-60 transition-all w-full' >Update</button>
                                </div>

                                {Boolean(all_myloans.length > 1) &&

                                    <div className='w-full mt-4'>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                openModal("delete_loan_modal");
                                                !loan_id && set_loan_id(all_myloans[0]._id);
                                            }}
                                            className='bg-red-500 text-[13px] text-white px-[10px] py-[10px] rounded-lg font-medium active:opacity-60 transition-all w-full'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                }

                            </div>

                            <div className='w-full mt-4'>
                                <button type='button' onClick={() => openModal("add_loan_modal")} className='bg-blue-500 text-[13px] text-white px-[10px] py-[10px] rounded-lg font-medium active:opacity-60 transition-all w-full' >Add New Loan</button>
                            </div>

                        </div>
                    </>
                }

            </form>
        </div >
    )
}

export default Admin