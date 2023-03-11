let database = {
    "click": "",
    "user1": {
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "41": 0,
      "42": 0,
      "43": 0,
      "44": 0,
      "45": 0,
      "51": 0,
      "52": 0,
      "53": 0,
      "54": 0,
      "55": 0
    }
  };
documentId = "1083471290496729088"

// element that gets the done Button
doneButton = document.getElementById("done");

// gets the fill button
fillButton = document.getElementById("fill");
// gets all the inputs fields
inputs = document.getElementsByTagName("input");
let bingoCount = 0;

// when the numbers are clicked, we will make sure they are stored somewhere. What we can do is create a matrix and replace the 
// respective corresponding values of the bumbers in the gird system with the matrix with the value true. SO true is basicaly  the crossed numbers.z
let matrix = [[false,false,false,false,false],
              [false,false,false,false,false],
              [false,false,false,false,false],
              [false,false,false,false,false],
              [false,false,false,false,false]] ;

// function checkWinner(matrix){
//     // search rows
//     for(let i = 0; i <4 ; i++){    // for rows
//         count = 0;
//         for(let j = 0; j< 5 ; j++){                  // for columns
//             if(matrix[i][j] == true){
//                 count = count +1 ;
//                 if(bingoCount === 5){
//                     return true;
//                 }
//             }
//         }
//         if (count === 5){
//             bingoCount = bingoCount + 1;
//         }     
//     }
//     // search columns

//     // search diagnols




//     if(bingoCount === 5){
//         return true;
//     }

// }



let isDone= false;        // isDone checks whether the selemts are set to non editable or not.
//code to set the numbers when clicked on the done button. This will not let change the numbers 
// we will store the indexes of the crossed 
doneButton.addEventListener('click', done);
function done(){ 
    doneButton.style.backgroundColor = 'red';
    for (let i= 0; i<25; i++){
        inputs[i].setAttribute('readonly', true);
    } 

    // this block of code is to cross the numbers whenever the users clicks on the numbers,or we can just change the color of the blocks.
    // First we have to make sure, the numbers are set Done i.e they are read only afer we click the done button, or the Done button and we have to store the numbers click on some sort of grid.
    isDone = true;
    if(isDone){ 
        for(let i = 0; i < inputs.length; i++){  
            inputs[i].addEventListener('click',function(){
                    inputs[i].style.backgroundColor = 'purple';
                    // this gets the index of the cell we click, i.e row and column,
                    let row = (inputs[i].getAttribute('row-index'));
                    let column = (inputs[i].getAttribute('column-index'));
                    var jsonObject;
                    // we save the index of the 
                    let key = (row).concat((column));
                    console.log(key);
                    axios.get('https://jsonblob.com/api/jsonBlob/1083471290496729088').then(function(response){
                        jsonObject = response.data;
                        console.log(jsonObject);
                        // jsonObject.user1[key] = 1;
                    })
                    axios.put('https://jsonblob.com/api/jsonBlob/1083471290496729088', {
                    jsonObject
                    }).
                    then(function(response){
                        console.log(response);
                    })
                    .catch(function(error){
                        console.log(error)
                    });
                    matrix[row][column] = true;
                    // run the algorithm to check 
                    //console.log(matrix);
                    if(checkWinner(matrix)){
                        //write some codes that stops the game and displays
                    }
                });
        }
    }
    }
    console.log(matrix);
// this block of code is to cross the numbers whenever the users clicks on the numbers,or we can just change the color of the blocks.
// First we have to make sure, the numbers are set Done, or the Done button is clicked.
//does not work when I check with isDone === true is not updated to true even though the required event is triggered.


//code to fill up the fields from 1- 25 randomly when clicked.
 var numbers = [];
 do{
    num = Math.floor(Math.random() * 25 +1);
    if(!(numbers.includes(num))){
        numbers.push(num);
    }
 } while((numbers.length !==25));

// no since we have the numbers that are unique, when clicked on the 
fillButton.addEventListener('click',fill);
  
function fill(){
    for (let i= 0; i<25; i++){
        //inputs[i].value='0';
        inputs[i].setAttribute('value',numbers[i]);
    } 
}

// Now once the digits are set, we have to find a way to cross the numbers
// once the numbers are crossed, we have to find a way to store the numbers, maybe in a  matrix and keep track of all the numbers that have been crossed.



// code that encorporates the JSONBlob as well.
