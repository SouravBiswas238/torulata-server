import Banner from "../models/bannerModels.js";


let bannerCtrl = {}

//API : /banner/add
//Method : POST
//Access : 
//Description : 
bannerCtrl.addBanner = async (req, res) => {

    try {
        const bannerUrl = req?.body?.url || {}
        const doc = { url: bannerUrl }
        const uploadResult = await Banner.create(doc)
        return res.status(200).json({
            "success": true,
            "message": "Upload successful",
            "result": uploadResult
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}

//API : /banner/
//Method : GET
//Access :
//Description : 
bannerCtrl.getAllBanner = async (req, res) => {

    try {

        const allBannerResult = await Banner.find()

        return res.status(200).json({
            "success": true,
            "message": "All banner url get successful",
            "result": allBannerResult
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}

//API : /banner/delete/id
//Method : Delete
//Access :
//Description : 
bannerCtrl.deleteBanner = async (req, res) => {

    try {
        const _id = req.params
        const query = { _id }
        const deleteResult = await Banner.deleteOne(query)
        return res.status(200).json({
            "success": true,
            "message": "Delete successful",
            "result": deleteResult
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}


export default bannerCtrl