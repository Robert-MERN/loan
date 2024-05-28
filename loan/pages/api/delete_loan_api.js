import connectMongo from "@/utils/functions/connectMongo"
import Myloans from "@/models/myloansModel";
import Repayments from "@/models/repaymentModal";
import mongoose from "mongoose";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    try {

        const { id } = req.query;
        await connectMongo();
        const repayment = await Repayments.findOne();

        if (repayment) {
            const repayment_exists = await Repayments.findOne({ loan_id: id });
            if (repayment_exists) {
                await Repayments.findOneAndDelete({ loan_id: id });
            }
        }
        await Myloans.findByIdAndDelete(id);
        const myloan = await Myloans.findOne();
        const { _id: loan_id, loan_name } = myloan;
        await Repayments.create({ loan_id, loan_name });

        return res.status(200).json({ status: true, message: "Loan is deleted!" });


    } catch (err) {
        const net_err_msg = "querySrv ENODATA _mongodb._tcp.application.bjwgp.mongodb.net"
        const no_internet = "querySrv ETIMEOUT _mongodb._tcp.application.bjwgp.mongodb.net"
        const slow_internet = "Operation `settings.findOne()` buffering timed out after"
        if (err.message.includes(net_err_msg)) {
            return res.status(501).json({ status: false, message: "No Internet Connection!" });

        } else if (err.message.includes(slow_internet)) {
            return res.status(501).json({ status: false, message: "Unstable Network!" });

        } else if (err.message.includes(no_internet)) {
            return res.status(501).json({ status: false, message: "No Internet!" });

        } else {
            return res.status(501).json({ status: false, message: err.message });

        }
    }
};