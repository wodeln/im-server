var mongoose = require('mongoose');
var FollowingSchemas = require('../schemas/FollowingSchemas');
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var Following = mongoose.model('im_following',FollowingSchemas);
module.exports = Following;