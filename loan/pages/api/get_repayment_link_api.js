import connectMongo from "@/utils/functions/connectMongo"
import Repayments from "@/models/repaymentModal";
import Myloans from "@/models/myloansModel";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    try {

        await connectMongo();

        const repayment = await Repayments.findOne();

        if (!repayment) {
            return res.status(200).json(null);
        }

        const myloan = await Myloans.findById(repayment.loan_id);
        if (!myloan) {
            return res.status(200).json(null);
        }

        return res.status(200).json(myloan);


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
}
