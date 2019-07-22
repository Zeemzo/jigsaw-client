const DiffMatchPatch = require('diff-match-patch') ;

const dmp = new DiffMatchPatch();

var genesis="123456."

console.log("Genesis:"+genesis)
//First contribution from 3 users
//4 votes
var user1="123456 yummy."

//5 votes
var user2="123456. Super."


var patch1=dmp.patch_make(genesis, user2)

var result0=dmp.patch_apply(patch1, genesis)
console.log("User 2 :"+result0[0])


//7 votes
var user3="123456.The lover's telephone is a form of mechanical telephony, and then reconverted back to sound. I am boss."

var patch2=dmp.patch_make(genesis, user3)

var result=dmp.patch_apply(patch2, result0[0])

console.log("User 3 :"+result[0])



///later user 1 gets 6 votes
var patch3=dmp.patch_make(genesis, user1)

// console.log(dmp.patch_toText(patch3))
var result1=dmp.patch_apply(patch3, result[0])

console.log("User 1 :"+result1[0])



//Second contribution from 2 users
//5 votes
var user4="I am boss."

var patch4=dmp.patch_make(result1[0], user4)
var result2=dmp.patch_apply(patch4, result1[0])
console.log("User 4 :"+result2[0])

//0 votes
var user5=""


// const diff1 = dmp.diff_main(genesis,change1);
// dmp.diff_cleanupSemantic(diff1)

// console.log(dmp.diff_prettyHtml(diff1))


// const diff2 = dmp.diff_main(genesis,change2);
// dmp.diff_cleanupSemantic(diff2)

// console.log(dmp.diff_prettyHtml(diff2))



