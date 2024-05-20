import { createContext, useContext, useState } from 'react'
import axios from "axios";


const StateContext = createContext();



export const ContextProvider = ({ children }) => {

    const defaultModals = {
        repayment_link_modal: false,
        borrow_amount_modal: false,
        logout_modal: false,
    };
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    };
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    };



    // loading state and error toastify for all api calls
    const [APIloading, setAPIloading] = useState(false);




    const [borrow_amount, set_borrow_amount] = useState("15,000.00");
    const [footer_tab, set_footer_tab] = useState("/");


    const [snackbar_alert, set_snackbar_alert] = useState({
        open: false,
        message: "",
        severity: "primary"
    });


    // Getting app settings api
    const handle_get_app_settings = async (set_app_settings) => {
        setAPIloading(true)
        try {

            const res = await axios.get("/api/get_app_settings");
            set_app_settings(res.data);
        } catch (err) {
            set_snackbar_alert({
                open: true,
                message: err.response.data.message,
                severity: "error"
            });
        } finally {
            setAPIloading(false)
        }
    }



    // updating app settings api
    const handle_update_app_settings = async (settings, code, set_default_states) => {
        setAPIloading(true)
        try {
            if (code !== "racker") {
                return set_snackbar_alert({
                    open: true,
                    message: "Wrong code",
                    severity: "error"
                });
            }
            const res = await axios.post("/api/update_app_settings", settings);
            set_default_states();
            set_snackbar_alert({
                open: true,
                message: res.data.message,
                severity: "success"
            });
        } catch (err) {
            set_snackbar_alert({
                open: true,
                message: err.response.data.message,
                severity: "error"
            });
        } finally {
            setAPIloading(false)
        }
    }


    const handle_submit_utr_notification = async (mail) => {
        try {
            setAPIloading(true);
            axios.post("/api/submit_utr_api", mail)

        } catch (err) {
            console.err(err.response.data.message)

        } finally {
            setAPIloading(false);

        }
    }

    const handle_user_device_info = async (mail) => {
        try {
            setAPIloading(true);
            axios.post("/api/user_device_info", mail)

        } catch (err) {
            console.err(err.response.data.message)

        } finally {
            setAPIloading(false);

        }
    }

    return (
        <StateContext.Provider
            value={{
                APIloading, setAPIloading,

                modals, openModal, closeModal,

                footer_tab, set_footer_tab,

                borrow_amount, set_borrow_amount,

                snackbar_alert, set_snackbar_alert,

                handle_get_app_settings,

                handle_update_app_settings,

                handle_submit_utr_notification,

                handle_user_device_info,
            }}
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;