documentId = "1083471290496729088"
api.GET(documentId,function(response){
    let value = response.data.click;
    console.log(value)
})
const api = {
    endpoint:'https://jsonblob.com/api/jsonBlob/',
    GET: function(userId){
        axios.get(`${api.endpoint}${documentId}`,{}.then(function(response){
            callback(response)
        }))

    }
}