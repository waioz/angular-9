// grab the things we need
const mongoose = require('mongoose');
const commonHelper = require('../helpers/commonHelper');
var mongoosePaginate = require('mongoose-paginate-v2');
mongoose.set('useFindAndModify', false);
//create schemaOptions
var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    },
    timestamps:true
  };


/**
 * list schema
 */
const ListsSchema = new  mongoose.Schema({
    name: String,
    poster : String,
    release_date: String
}, schemaOptions);
ListsSchema.virtual('original_image').get(function () {
  if(this.poster)
  {
    return commonHelper.getBaseurl()+"/uploads/lists/"+this.poster;
  }
  else
  { 
    return commonHelper.getBaseurl()+"/images/no_image.png";
  }
});
ListsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Lists',ListsSchema);