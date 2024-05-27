import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import useStateContext from '@/context/ContextProvider';


const Add_loan_modal = ({ open, close }) => {

    const { handle_add_myloan } = useStateContext();

    const handle_add = () => {
        handle_add_myloan();
        close();
    };

    return (
        <Dialog
            open={open.add_loan_modal}
            onClose={close}
        >
            <div className=' md:w-[500px] p-6 md:p-7 relative flex flex-col gap-8 md:gap-10' >
                <div onClick={close} className='absolute hidden md:block right-0 md:right-3 top-2 md:top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[13px] md:text-[16px] text-stone-600 font-medium' >Are you sure, do you want to add a new loan?</p>
                <div className='w-full flex justify-end gap-4' >
                    <button onClick={close} className='text-[12px] md:text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Cancel</button>
                    <button onClick={handle_add} className='bg-blue-500 hover:bg-blue-400 px-6 py-[6px] rounded-md text-white text-[12px] md:text-[15px] transition-all' >Add</button>
                </div>
            </div>
        </Dialog>
    )
}

export default Add_loan_modal