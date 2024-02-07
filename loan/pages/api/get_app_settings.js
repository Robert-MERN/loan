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

        if (!setting) {
            return res.status(404).json({ status: false, message: "Setting was not found" });
        }


        return res.status(200).json(setting);

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

