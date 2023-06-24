import Contact from "../models/contactModal.js";

let contactCtrl = {}

//API : /contact/add
//Method : POST
//Access : 
//Description : 

contactCtrl.addNewContact = async (req, res) => {
    try {
        const contact = req?.body?.emailParams || {}
        // console.log(contact)
        const createContact = await Contact.create(contact)
        return res.status(200).json({
            "success": true,
            "message": "Upload successful",
            "result": createContact
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }

}

export default contactCtrl
