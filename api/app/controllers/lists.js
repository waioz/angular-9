const ListsModel = require('../models/lists');
const commonHelper = require('../helpers/commonHelper');
const mime = require('mime');
const fs = require('fs');

exports.get_lists = async(req, res, next) => {
    var requests = req.bodyParams
    var pagination = requests.pagination || "true"
    var page = requests.page || 1
    const options = {
        page: page,
        limit: 18,
        sort:{createdAt:-1}
    };
    var match={}
    if(typeof requests.id!="undefined" && requests.id!="")
    {
        match['_id']= requests.id;
    }
    if(typeof requests.search!="undefined" && requests.search!="")
    {
        match['name']= { $regex : new RegExp(requests.search, "i") } 
    }
    if(pagination=="true")
    {
        ListsModel.paginate(match, options, function(err, result) {
            return res.apiResponse(true, "Success",result)
        });
    }
    else
    {
        var lists = await ListsModel.find(match).sort({createdAt: -1});
        return res.apiResponse(true, "Success",{lists})
    }
}
exports.update_list = async(req, res, next) => {
    var requests = req.bodyParams;
    if(requests.type=="edit")
    {
        var id = requests.id;
        var update_data={};
        update_data.name = requests.name;
        update_data.release_date = requests.release_date;
        await ListsModel.findOneAndUpdate({ "_id": id }, { "$set": update_data}).exec(async(err)=>{
            await upload_file(req,id);
            return res.apiResponse(true, "Updated Successfully");
        });
    }
    else
    {
        const list_detail = {
            name: requests.name,
            release_date: requests.release_date
        }
        var list = new ListsModel(list_detail);
        await list.save(async (err,res_list)=> {
            var id = res_list.id; 
            await upload_file(req,id);
            return res.apiResponse(true, "Added Successfully");
        });
    }
}
upload_file = async(req,id)=>
{
    if(req.body.poster && typeof req.body.poster!="undefined" && req.body.poster!=null)
    {
        // to declare some path to store your converted image
        var matches = req.body.poster.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
        if (matches==null) {
            return false;
        }
        if (matches.length !== 3) {
            return false;
        }
        
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        var d = new Date();
        let posterName = 'list' + d.getTime()+id + '.' + extension;
        const path = 'uploads/lists/';
        commonHelper.prepareUploadFolder(path)
        try {
            fs.writeFileSync(path + posterName, imageBuffer, 'utf8');
            var update_data={};
            update_data.poster = posterName;
            await ListsModel.findOneAndUpdate({ "_id": id }, { "$set": update_data}).exec();
        } catch (e) {
            return false;
        }
    }
    return true;
}
exports.delete_list = async(req, res, next) =>{
    var requests = req.bodyParams
    ListsModel.findById(requests.id, function (err, listDetails) {
        listDetails.remove()
    });
    return res.apiResponse(true, "Successfully list deleted")
}