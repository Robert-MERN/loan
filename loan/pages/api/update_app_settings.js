import connectMongo from "@/utils/functions/connectMongo"
import Settings from "@/models/settingsModel";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    try {

        await connectMongo();

        const setting = await Settings.findOne();

        if (setting) {
            await Settings.findByIdAndUpdate(setting._id, req.body);
        } else {
            await Settings.create(req.body);
        }


        return res.status(200).json({ status: false, message: "App settings are updated" });

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

