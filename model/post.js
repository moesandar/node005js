var mongoose=require('mongoose');
var schema=mongoose.Schema;
var PostSchema=new schema({

title:{
  type:String,
  required:true
},

content:{
type:String,
required:true
},

author:{
type:String,
required:true
}
})
// PostSchema.pre('save',function(next){
//   this.password=bcrypt.hashSync(this.password,bcrypt.genSaltSync(8),null);
//   next();
// })
// PostSchema.statics.compare=function(cleartext,encrypted){
//   return bcrypt.compareSync(cleartext,encrypted);
// }

module.exports=mongoose.model('posts',PostSchema);
