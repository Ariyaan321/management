import axios from "axios"

export default async function ApiData(meth, data, userId = "", userOrProd = true) {
    let baseUrl = ""
    userOrProd ? baseUrl = "http://localhost:8080/users" : baseUrl = "http://localhost:8080/products"

    switch (meth) {
        case 'post':
            try {
                const reso = await axios.post(baseUrl, data);
                return reso.data;

            }
            catch (err) {
                return "Some error occured";
            }

        case 'put':
            const message = await axios.put(baseUrl + "/" + userId, data)
            return message.data

        case 'delete':
            try {
                const message = await axios.delete(baseUrl + "/" + userId)
                return message.data
            }
            catch (err) {
                return err.message
            }

        default:
            break;
    }

    return "Some Error Occurred"
}