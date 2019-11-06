var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then(function(penguins)
{
    console.log("works", penguins);
    
    console.log(QuizArray(penguins));
    
    //setupSVG(penguins);
    
    console.log(getQuizes(penguins[0]));
    
    console.log(makeYVals(penguins, 0));
    
    //console.log(ys(penguins));
    
    //makeGraph(penguins);
    
},
function(error)                  
{
   console.log("errors",error)               
})

//two functions that create an array of all the quiz grades for each penguin in an array
var getQuizes = function(penguin)
    {
        return penguin.quizes.map(getGrade);
    }

var QuizArray = function(penguins)
    {
        return penguins.map(getQuizes);
    }

var getGrade = function(quiz)
    {
        return quiz.grade
    }

/*var getQuizDay = function(penguin, day)
{
    return penguin.quizes[day].grade;
}

var getQuizesOne = function(penguins)
{
    return penguins.map(getQuizDay); 
}*/


/*var ys= function(penguins)
    {
        return QuizArray(penguins).map(function(penguin)
        {
            return penguin[0];
        })

    }*/
    
var ys = [7, 9, 3, 6, 7, 5, 6, 7, 5, 7, 4, 6, 5, 7, 5, 6, 9, 6, 5, 8, 5, 6, 9]

var makeYVals = function(penguins,day)
    {
        return QuizArray(penguins).map(function(penguin)
        {
            return penguin[day];
        })
    }


//begin attempt to plot some points
var screen = {width: 800, height: 500}

var setupSVG = function(points)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
}

setupSVG()

/*var makeGraph = function(penguins)
{
    var ys= function(penguins)
    {
        return QuizArray(penguins).map(function(penguin)
        {
            return penguin[0];
        })

    }*/

    var drawSampleGraph = function(points, xscale, yscale)
    {
        var points= ys.map(function(y,i)
        {

            return{
                x:i +1, //if something goes crazy remove +1
                y: y
            }
        })

        console.log("points???", points)

        var xscale=d3.scaleLinear()
        xscale.domain([0,d3.max(points, function(p)
                               {return p.x})])
        xscale.range([0,screen.width-10])

        var yscale=d3.scaleLinear()
        yscale.domain([0, d3.max(points, function(p)
                                {return p.y})])
        yscale.range([screen.height,10])

        d3.select("svg")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", function(point)
              {return xscale(point.x)})
        .attr("cy", function(point)
              {return yscale(point.y)})

    }

    drawSampleGraph()

//}

//drawSampleGraph()