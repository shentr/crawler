const req = require('superagent');

let
url = 'https://vjudge.net/status/data',
formData = {
    draw: 1,
    'columns[0][data]':0,
    'columns[0][name]':'',
    'columns[0][searchable]':true,
    'columns[0][orderable]':false,
    'columns[0][search][value]':'',
    'columns[0][search][regex]':false,
    'columns[1][data]':1,
    'columns[1][name]':'',
    'columns[1][searchable]':true,
    'columns[1][orderable]':false,
    'columns[1][search][value]':'',
    'columns[1][search][regex]':false,
    'columns[2][data]':2,
    'columns[2][name]':'',
    'columns[2][searchable]':true,
    'columns[2][orderable]':false,
    'columns[2][search][value]':'',
    'columns[2][search][regex]':false,
    'columns[3][data]':3,
    'columns[3][name]':'',
    'columns[3][searchable]':true,
    'columns[3][orderable]':false,
    'columns[3][search][value]':'',
    'columns[3][search][regex]':false,
    'columns[4][data]':4,
    'columns[4][name]':'',
    'columns[4][searchable]':true,
    'columns[4][orderable]':false,
    'columns[4][search][value]':'',
    'columns[4][search][regex]':false,
    'columns[5][data]':5,
    'columns[5][name]':'',
    'columns[5][searchable]':true,
    'columns[5][orderable]':false,
    'columns[5][search][value]':'',
    'columns[5][search][regex]':false,
    'columns[6][data]':6,
    'columns[6][name]':'',
    'columns[6][searchable]':true,
    'columns[6][orderable]':false,
    'columns[6][search][value]':'',
    'columns[6][search][regex]':false,
    'columns[7][data]':7,
    'columns[7][name]':'',
    'columns[7][searchable]':true,
    'columns[7][orderable]':false,
    'columns[7][search][value]':'',
    'columns[7][search][regex]':false,
    'columns[8][data]':8,
    'columns[8][name]':'',
    'columns[8][searchable]':true,
    'columns[8][orderable]':false,
    'columns[8][search][value]':'',
    'columns[8][search][regex]':false,
    'columns[9][data]':9,
    'columns[9][name]':'',
    'columns[9][searchable]':true,
    'columns[9][orderable]':false,
    'columns[9][search][value]':'',
    'columns[9][search][regex]':false,
    'columns[10][data]':10,
    'columns[10][name]':'',
    'columns[10][searchable]':true,
    'columns[10][orderable]':false,
    'columns[10][search][value]':'',
    'columns[10][search][regex]':false,
    start:0,
    length:20,
    'search[value]':'',
    'search[regex]':false,
    un:'shentr',
    OJId:'All',
    probNum:'',
    res:1,
    language:'',
    onlyFollowee:false,
    orderBy:'run_id'
};

let set = {
    accept:'application/json, text/javascript, */*; q=0.01',
    'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
    'x-requested-with':'XMLHttpRequest',
};

req
    .post(url)
    .set(set)
    .type('form')
    .send(formData)
    .end((err, res)=>{
    if(err)
        console.log(err);
    console.log(res.text)
})