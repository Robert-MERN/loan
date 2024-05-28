import { Schema, connection } from "mongoose"

const myloansSchema = new Schema(
    {
        loan_name: {
            type: String,
            unique: [true, "Use different name!"],
        },
        loan_amount: {
            type: String,
            default: "00",

        },
        lenders: {
            type: String,
            default: "Lenders",
        },
        repayment_time: {
            type: String,
            default: "DD-MM-YYYY",
        },
    },
    { timestamps: true });

const Db = connection.useDb("Loan");
const Myloans = Db.models.Myloans || Db.model('Myloans', myloansSchema);
export default Myloans

