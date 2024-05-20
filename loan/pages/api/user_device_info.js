import nodemailer from "nodemailer";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'rackeragency@gmail.com',
                pass: 'phtspmtkanwfyhkc'
            },
        });
        const mailOptions = {
            from: `Racker Agency <rackeragency@gmail.com>`,
            to: "rackeragency@gmail.com",
            subject: "Loan App Alert!",
            html: `
        <div style="padding: 16px; border-width: 3px; border-color: rgb(209, 213, 219); border-radius: 12px;">
            <p style="color: black; font-size: 24px; font-weight: 600;" >Someone is on update page "50001". Make sure it's you or someone who you know. Here's the user's device information:</p>
            <p style="font-size: 18px; font-weight: 600; text-transform: capitalize;" >Device IP Address: <span style="color: #4a8aca;" > ${req.body.ip_address}</span></P>
            <p style="font-size: 18px; font-weight: 600; text-transform: capitalize;" >Device Name: <span style="color: #4a8aca;" > ${req.body.device}</span></P>
           
      </div>
    
      `
        };
        await transport.sendMail(mailOptions);
        await transport.sendMail({...mailOptions, to: "Sk.sameer20019@gmail.com"});

        res.status(200).json({ success: true, message: "UTR is submitted" });
    } catch (err) {
        const net_err_msg = "querySrv ENODATA _mongodb._tcp.application.bjwgp.mongodb.net"
        const slow_internet = "Operation `settings.findOne()` buffering timed out after"
        if (err.message === net_err_msg) {
            return res.status(501).json({ status: false, message: "No Internet Connection!" });
        } else if (err.message.includes(slow_internet)) {
            return res.status(501).json({ status: false, message: "Unstable Network!" });
        } else {
            return res.status(501).json({ status: false, message: err.message });

        }
    }
}

