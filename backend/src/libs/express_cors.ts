import { CustomExpress } from "types/custom_express"
import { CorsError } from "./express_errors"

export default function get_cors(whitelist_string) {
    console.log("[CORS] 📗 setup " + whitelist_string)
    const whitelist = whitelist_string.split("|")
    return function (req: CustomExpress.Req, callback) {
        if (req.path.startsWith('/anamnese/download')) {
            return callback(null, { origin: true })
        }
        const origin = req.header("Origin")
        const apIKey = req.header("x-api-key")

        if ((origin && whitelist.indexOf(origin) !== -1) || apIKey == 'mithrandil') {
            callback(null, { origin: true })
        } else {
            callback(new CorsError("Not allowed by CORS", "cors error", { origin, whitelist }))
        }
    }
}