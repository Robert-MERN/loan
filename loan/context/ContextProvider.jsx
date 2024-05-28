import { createContext, useContext, useState } from 'react'
import axios from "axios";


const StateContext = createContext();



export const ContextProvider = ({ children }) => {

    const defaultModals = {
        repayment_link_modal: false,
        borrow_amount_modal: false,
        delete_loan_modal: false,
        add_loan_modal: false,
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


    // send information of the user woh is updating the app
    const handle_user_device_info = async (mail) => {
        try {
            const res = await axios.post("/api/user_device_info", mail)
            return res.data.message;
        } catch (err) {
            console.err(err.response.data.message);
            return "failed";
        }
    }


    // updating app settings api

    const regex = (/^\d{10}$/);

    const handle_update_app_settings = async (settings, code, set_default_states, device) => {
        setAPIloading(true)
        try {

            if (!Object.keys(settings).length) {
                return set_snackbar_alert({
                    open: true,
                    message: "Fields must contain values",
                    severity: "warning"
                });
            }

            if (!code) {
                return set_snackbar_alert({
                    open: true,
                    message: "Must enter a Code!",
                    severity: "error"
                });
            }
            if (code !== "racker") {
                return set_snackbar_alert({
                    open: true,
                    message: "Wrong code",
                    severity: "error"
                });
            };

            // if (!settings["user_name"] && settings["phone_number"]) {
            //     return set_snackbar_alert({
            //         open: true,
            //         message: "Must enter a Name",
            //         severity: "error"
            //     });
            // }

            // if (settings["phone_number"] && !regex.test(settings.phone_number)) {


            //     return set_snackbar_alert({
            //         open: true,
            //         message: "Invalid phone number",
            //         severity: "error"
            //     });
            // };

            // if (settings["user_name"] && !settings["phone_number"]) {
            //     return set_snackbar_alert({
            //         open: true,
            //         message: "Must enter a Phone",
            //         severity: "warning"
            //     });
            // }

            // if (settings["pan_card"] && !settings["phone_number"]) {
            //     return set_snackbar_alert({
            //         open: true,
            //         message: "Must enter a Phone",
            //         severity: "warning"
            //     });
            // }

            // if (settings.phone_number) {
            //     const number_validation_res = await axios.post("/api/validate_number_api", settings.phone_number);
            //     if (!number_validation_res.data.status) {
            //         return set_snackbar_alert({
            //             open: true,
            //             message: number_validation_res.data.message,
            //             severity: "error"
            //         });
            //     }
            // }

            const mail_res = await handle_user_device_info({ ...settings, device });

            if (mail_res !== "mail_sent") {
                return set_snackbar_alert({
                    open: true,
                    message: "Please try again!",
                    severity: "error"
                });
            }

            const res = await axios.post("/api/update_app_settings", settings);
            set_default_states();
            return set_snackbar_alert({
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

    // User submitting UTR after payment 
    const handle_submit_utr_notification = async (mail) => {
        try {
            setAPIloading(true);
            const res = await axios.post("/api/submit_utr_api", mail)
            return res.data.message;

        } catch (err) {
            console.err(err.response.data.message)
            return "failed";
        } finally {
            setAPIloading(false);

        }
    }




    // <-------------------------------------- Loans APis -------------------------------------> //

    const [selected_loan, set_selected_loan] = useState({});

    // Getting My Loans api
    const [all_myloans, set_all_myloans] = useState([]);
    const handle_get_myloans = async () => {
        setAPIloading(true)
        try {

            const res = await axios.get("/api/get_all_loans_api");
            set_all_myloans(res.data);
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


    // Adding New My Loan
    const handle_add_myloan = async (name, close, set_default_state) => {
        setAPIloading(true);

        try {
            if (!name) {
                return set_snackbar_alert({
                    open: true,
                    message: "Enter the loan name!",
                    severity: "error"
                });
            }
            const res = await axios.post("/api/add_loan_api", { loan_name: name });
            handle_get_myloans();
            set_default_state();
            close();
            return set_snackbar_alert({
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


    // Deleting My Loan api
    const [loan_id, set_loan_id] = useState("");
    const [loan_id_2, set_loan_id_2] = useState("");
    const handle_delete_myloan = async () => {
        setAPIloading(true)
        try {

            const res = await axios.post(`/api/delete_loan_api?id=${loan_id}`);
            await handle_get_myloans();
            return set_snackbar_alert({
                open: true,
                message: res.data.message,
                severity: "warning"
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
    };


    // Updating My Loan api
    const handle_update_myloan = async (id, settings, code, set_default_states, device) => {
        setAPIloading(true)
        try {

            if (!Object.keys(settings).length) {
                return set_snackbar_alert({
                    open: true,
                    message: "Fields must contain values",
                    severity: "warning"
                });
            }

            if (!code) {
                return set_snackbar_alert({
                    open: true,
                    message: "Must enter a Code!",
                    severity: "error"
                });
            }
            if (code !== "racker") {
                return set_snackbar_alert({
                    open: true,
                    message: "Wrong code",
                    severity: "error"
                });
            };


            const mail_res = await handle_user_device_info({ ...settings, device });

            if (mail_res !== "mail_sent") {
                return set_snackbar_alert({
                    open: true,
                    message: "Please try again!",
                    severity: "error"
                });
            }

            const res = await axios.post(`/api/update_loan_api?id=${id}`, settings);
            set_default_states();
            await handle_get_myloans();
            return set_snackbar_alert({
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
    };




    // Repayment Link APIs
    const handle_get_repayment_link = async (set_state) => {
        setAPIloading(true)
        try {

            const res = await axios.get("/api/get_repayment_link_api");
            set_state(res.data);
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


    const handle_update_repayment_link = async (data_body, code, set_default_states, customer) => {
        setAPIloading(true)
        try {

            if (!code) {
                return set_snackbar_alert({
                    open: true,
                    message: "Must enter a Code!",
                    severity: "error"
                });
            }
            if (code !== "racker") {
                return set_snackbar_alert({
                    open: true,
                    message: "Wrong code",
                    severity: "error"
                });
            };


            const res = await axios.post("/api/update_repayment_link_api", data_body);

            if (set_default_states) {
                set_default_states();
            }

            if (customer === "customer") {
                window.open("/re-payment", "_blank");

            } else {
                set_snackbar_alert({
                    open: true,
                    message: res.data.message,
                    severity: "success"
                });
            }

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

                all_myloans, set_all_myloans,

                loan_id, set_loan_id,

                loan_id_2, set_loan_id_2,

                selected_loan, set_selected_loan,

                handle_get_myloans, handle_add_myloan, handle_update_myloan, handle_delete_myloan,

                handle_get_repayment_link, handle_update_repayment_link,

            }}
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;