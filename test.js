// Define the document ID for the JSONBlob document
const axios = require('axios/dist/browser/axios.cjs');
const documentID = 1083471290496729088;
const api={
	endpoint:'https://jsonblob.com/api/jsonBlob/',
	GET:function(documentID,callback){
		axios.get(`${api.endpoint}${documentID}`,{}).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	},
	PUT:function(documentID,data,callback){
		axios.put(`${api.endpoint}${documentID}`,data).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	}
}

// Make a GET request to retrieve the JSON data from the document
api.GET(documentID, function(response) {
  // Access the first value using dot notation
  const firstValue = response.data.user1;
  console.log(firstValue); // ""

  // Or access the first value using bracket notation
  const firstValue2 = response.data['click'];
  console.log(firstValue2); // ""
});
