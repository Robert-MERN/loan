import { Schema, connection } from "mongoose"

const repaymentSchema = new Schema(
    {
        loan_name: {
            type: String,
        },
        loan_id: {
            type: String,
        },
    },
    { timestamps: true });

const Db = connection.useDb("Loan");
const Repayments = Db.models.Repayments || Db.model('Repayments', repaymentSchema);
export default Repayments

