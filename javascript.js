var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then(function(penguins)
{
    console.log("works", penguins);
    
    console.log(QuizArray(penguins));
    
    console.log(getQuizes(penguins[0]));
    
    console.log(ys(penguins, 37));
    
    drawSampleGraph(penguins, 1);
    
    changeDay(penguins);
    
    console.log(penguins[0].quizes);
    
    nextDay(penguins);
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

// this is the function that makes and tells the day buttons what to do
var changeDay = function(penguins)
{
    d3.select("#Buttons")
    .selectAll("button")
    .data(penguins[0].quizes)
    .enter()
    .append("button")
    .text(function(d)
                   {
                    return "Day " + d.day;
                    })
    .on("click", function(d)
                    {
                        d3.selectAll("circle")
                        .remove();
        
                        nextDay(penguins, d.day);
        
                        return drawSampleGraph(penguins, d.day);
                                                            
                    })
            
}

// helper function to set what the next button will do when it is clicked
var nextDay = function(penguins, day)
{
    d3.select("#next")
    .on("click", function(penguins, day)
        {
            console.log("reached this point")

            d3.selectAll("circle")
            .remove()
                            
            var addDay= function(x){return x+1}
            
            var newDay = addDay(day)

            return drawSampleGraph(penguins, newDay)
        })
}


// this is the function that determines the y values
var ys= function(penguins,day)
    {
        return QuizArray(penguins).map(function(penguin)
            {
                var fixDays = function(d)
                    {
                        if(d<15)
                            {return d-1}
                        else if(d<30)
                            {return d-2}
                        else {return d-3};
                    }
            
                return penguin[fixDays(day)];
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

var drawSampleGraph = function(penguins,day)
    {
        var points= ys(penguins,day).map(function(y,i)
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
        yscale.range([screen.height-10,10])

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