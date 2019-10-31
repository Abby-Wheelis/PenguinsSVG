var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then(function(penguins)
{
    console.log("works", penguins);
    
    console.log(penguins.map(getQuizDay));
},
function(error)                  
{
   console.log("errors",error)               
})



var getQuizDay = function(penguin)
{
    return penguin.quizes[0].grade;
}

var getQuizesOne = function(penguins)
{
    return penguins.map(getQuizDay); 
}




var ys = [7, 9, 3, 6, 7, 5, 6, 7, 5, 7, 4, 6, 5, 7, 5, 6, 9, 6, 5, 8, 5, 6, 9]
//var ys = d3.range(23)

var points= ys.map(function(y,i)
{
    
    return{
        x:i,
        y: y
    }
})

console.log("points???", points)