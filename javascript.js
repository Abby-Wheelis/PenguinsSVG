var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then(function(penguins)
{
    console.log("works", penguins);
    
    console.log(penguins.map(getQuizDay));
    
    //drawSampleGraph(penguins);
    
    //setupSVG(penguins);;
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

/*var ys = function(data)
    {
        return data.quizes.map(getGrade = function(grade)
                                    {
                                        return quiz.grade

                                    })
    }*/




//begin attempt to plot some pointses
var screen = {width: 800, height: 500}

var setupSVG = function(points)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
    var xscale=d3.scaleLinear()
    xscale.domain([0,d3.max(points, function(p)
                           {return p.x})])
    xscale.range([0,screen.width])
    
    var yscale=d3.scaleLinear()
    yscale.domain([0, d3.max(points, function(p)
                            {return p.y})])
    yscale.range([0,screen.height])
    
    //drawSampleGraph(points,xscale,yscale)
}

var drawSampleGraph = function(points, xscale, yscale)
{
    
    var points= ys.map(function(y,i)
        {

            return{
                x:i,
                y: y
            }
        })
    
    console.log("points???", points)

    d3.select("svg")
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", function(point)
          {return /*xscale*/(point.x)})
    .attr("cy", function(point)
          {return /*yscale*/(point.y)})
    
}

//setupSVG()

drawSampleGraph()