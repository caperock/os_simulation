var input_data = []
var chuck
var totalTime
var currentStartTime
var currentEndTime
var result
var priority_input = []



//Hide the frame[1] at the beginning
$("#output",window.parent.frames[1].document).hide()

$("#random").click(function () {
  jobs_number = parseInt($("#Jobs_input").val())
  random_value = []
  for (let i = 0; i < jobs_number; i++)
  {
    random_value[i]=Math.floor(Math.random() * 9) + 1
  }
   $("#input_sequence").val(random_value)
})

$("#randomp").click(function () {
  jobs_number = parseInt($("#Jobs_input").val())
  random_value = []
  for (let i = 0; i < jobs_number; i++)
  {
    random_value[i]=Math.floor(Math.random() * 9) + 1
  }
   $("#pvalue").val(random_value)
})

//The Go button, read input from frame0
$("#GO").click(function () {
  //Detect the input array, then transfer it into the input_data
  input_data = $("#input_sequence").val().split(" ")
  if (input_data.length<2)
  input_data = $("#input_sequence").val().split(",")
  if (input_data.length<2)
  input_data = $("#input_sequence").val().split(".")
  // Transfer process
  var length_count = 0;
  while(length_count<input_data.length)
  {
    input_data[length_count] = parseInt(input_data[length_count])
    length_count++
  }
  //read Priority Value
  priority_input = $("#pvalue").val().split(" ")
  if (priority_input.length<2)
  priority_input = $("#pvalue").val().split(",")
  if (priority_input.length<2)
  priority_input = $("#pvalue").val().split(".")
  var length_count = 0;
  while(length_count<input_data.length)
  {
    priority_input[length_count] = parseInt(priority_input[length_count])
    length_count++
  }
  //read the Jobs
  jobs_number = parseInt($("#Jobs_input").val())
  //read the Quantam, for Round Robin Algorithm
  quantam_number = parseInt($("#Quantam_input").val())
  //read the algorithm
var radios = document.getElementsByName('Algorithm')
//IF statement to check choice
  if (radios[0].checked) 
  {
    algorithm="FCFS"
    algorithm_name = "First Come First Serve"
  }
  if (radios[1].checked) 
  {
    algorithm="Priority_Scheduling"
    algorithm_name = "Priority Scheduling"
  }
  if (radios[2].checked) 
  {
    algorithm="Round_Robin"
    algorithm_name = "Round Robin"
  }if (radios[3].checked) 
  {
    algorithm="SJF"
    algorithm_name = "Short Job First"
  }
  //Starting to make figure for frame1
  Draw_Frame1(algorithm, jobs_number, quantam_number)
})

function Draw_Frame1(algorithm, jobs_number, quantam_number) {
  //refersh the frame1
  $("#output",window.parent.frames[1].document).html("")
  //construct the tittle
  let tittle = `
    <div class="card-panel grey lighten-3"><div class="row"><font size="3">
      <div class="col s12"><center><font size="5">${algorithm_name}</font></center></div>
    </font></div></div>
      `
  //Constuct body
  let columns = 3
  let rows = ""
  let rowHeader  = "<tr><td>Process</td>"

  //Constuct header row
  rowHeader += `<td><font color="#ff794d">Arrival Time</font></td>`
  rowHeader += `<td><font color="#ff794d">Execution Time</font></td>`
  rowHeader += `<td><font color="#ff794d">Priority Value</font></td>`
  rowHeader  += "</tr>"
  rows += rowHeader 


  //Constuct conten Rows
  for (let i = 0; i < jobs_number; i++) {
    let row = `<tr><td>P${i}</td>`
    row += `<td>${i}</td>`
    row += `<td>${input_data[i]}</td>`
    row += `<td>${priority_input[i]}</td>`
    row += "</tr>"
    rows += row
  }

  //Constuct option button for track, forward backward show all
  let track_option = `
  <table class="responsive-table centered">${rows}</table>
  `

  //insert tittle and button
  $("#output",window.parent.frames[1].document).append(tittle)
  $("#output",window.parent.frames[1].document).append(track_option)


  for(let i =0;i<jobs_number;i++)
  {
    totalTime+=input_data[i]
  }
  switch(algorithm)
  {
    case("FCFS"):
    chunks = jobs_number
    result = ""
    //first row
    result += `<div class="row">`
    result += `<a class="red darken-1 btn">`
    result += `&nbsp&nbsp&nbsp&nbsp&nbspProcess:</a>`
    for(let a=0; a<chunks; a++)
    {
    result += `<a class="red darken-1 btn">`
    if(input_data[a]<=3)
    {
    }
    else if(input_data[a]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[a]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    result += `P${a}</a>`
    }
    result += `</div>`
    //second row
    result += `<div class="row">`
    result += `<a class="lime lighten-5 btn">`
    result += `<font color="black">&nbspSize(space):</font></a>`
    for(let a=0; a<chunks; a++)
    {
    result += `<a class=" lime lighten-5 btn">`
    if(input_data[a]<=3)
    {
    }
    else if(input_data[a]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[a]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    if(a>9)
    {
      result += `<font color="black">&nbsp&nbsp&nbsp&nbsp${input_data[a]}</font></a>`
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${input_data[a]}</font></a>`
    }
    }
    result += `</div>`
    //third row
    let time_count=0
    result += `<div class="row">`
    result += `<a class="grey lighten-4 btn">`
    result += `<font color="black">Time(space):</font></a>`
    for(let a=0; a<chunks; a++)
    {
    result += `<a class=" grey lighten-4 btn">`
    if(input_data[a]<=3)
    {
    }
    else if(input_data[a]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[a]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    for(let b=0;b<input_data[a];b++)
    {
      time_count++
    }
    if(time_count>9)
    {
      if(a>9)
      {
        result += `<font color="black">&nbsp&nbsp${time_count}</font></a>`
      }
      else
      {
        result += `<font color="black">${time_count}</font></a>`
      }
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${time_count}</font></a>`
    }
    }
    result += `</div>`
    break


    case("Priority_Scheduling"):
    result = ""
    temp = []
    var min
    var minLocation
    let ps_count=0
    //first row
    result += `<div class="row">`
    result += `<a class="red darken-1 btn">`
    result += `&nbsp&nbsp&nbsp&nbsp&nbspProcess:</a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=priority_input[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="red darken-1 btn">`
      min = -999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min<priority_input[minF])
        {
          min=priority_input[minF]
          minLocation=minF
        }
      }
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    result += `P${minLocation}</a>`
    temp[minLocation]=-1
    }
    result += `</div>`
   //second row
    result += `<div class="row">`
    result += `<a class="lime lighten-5 btn">`
    result += `<font color="black">&nbspSize(space):</font></a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=priority_input[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="lime lighten-5 btn">`
      min = -999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min<priority_input[minF])
        {
          min=priority_input[minF]
          minLocation=minF
        }
      }
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    if(minLocation>9)
    {
      result += `<font color="black">&nbsp&nbsp&nbsp&nbsp${input_data[minLocation]}</font></a>`
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${input_data[minLocation]}</font></a>`
    }
    temp[minLocation]=-1
    }
    result += `</div>`
    //third row
    result += `<div class="row">`
    result += `<a class="grey lighten-4 btn">`
    result += `<font color="black">Time(space):</font></a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=priority_input[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="grey lighten-4 btn">`
      min = -999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min<priority_input[minF])
        {
          min=priority_input[minF]
          minLocation=minF
        }
      }
    ps_count = ps_count + input_data[minLocation]
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    if(ps_count>9)
    {
      if(minLocation>9)
      {
        result += `<font color="black">&nbsp&nbsp${ps_count}</font></a>`
      }
      else
      {
        result += `<font color="black">${ps_count}</font></a>`
      }
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${ps_count}</font></a>`
    }
    temp[minLocation]=-1
    }
    result += `</div>`
    break

    case("SJF"):
    result = ""
    temp = []
    var min
    var minLocation
    let sjf_count=0
    //first row
    result += `<div class="row">`
    result += `<a class="red darken-1 btn">`
    result += `&nbsp&nbsp&nbsp&nbsp&nbspProcess:</a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=input_data[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="red darken-1 btn">`
      min = 999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min>input_data[minF])
        {
          min=input_data[minF]
          minLocation=minF
        }
      }
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    result += `P${minLocation}</a>`
    temp[minLocation]=-1
    }
    result += `</div>`
   //second row
    result += `<div class="row">`
    result += `<a class="lime lighten-5 btn">`
    result += `<font color="black">&nbspSize(space):</font></a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=input_data[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="lime lighten-5 btn">`
      min = 999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min>input_data[minF])
        {
          min=input_data[minF]
          minLocation=minF
        }
      }
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    if(minLocation>9)
    {
      result += `<font color="black">&nbsp&nbsp&nbsp&nbsp${input_data[minLocation]}</font></a>`
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${input_data[minLocation]}</font></a>`
    }
    temp[minLocation]=-1
    }
    result += `</div>`
    //third row
    result += `<div class="row">`
    result += `<a class="grey lighten-4 btn">`
    result += `<font color="black">Time(space):</font></a>`
    for(let b =0;b<jobs_number;b++)
    {
      temp[b]=input_data[b]
    }
    for(let a =0;a<jobs_number;a++)
    {
      result += `<a class="grey lighten-4 btn">`
      min = 999999
      minLocation = -1
      for(let minF=0;minF<jobs_number;minF++)
      {
        if(temp[minF]!=-1 && min>input_data[minF])
        {
          min=input_data[minF]
          minLocation=minF
        }
      }
    sjf_count = sjf_count + input_data[minLocation]
    if(input_data[minLocation]<=3)
    {
    }
    else if(input_data[minLocation]<=5)
    {
      result += `&nbsp&nbsp&nbsp&nbsp`
    }
    else if(input_data[minLocation]<=7)
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    else
    {
      result += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`
    }
    if(sjf_count>9)
    {
      if(minLocation>9)
      {
        result += `<font color="black">&nbsp&nbsp${sjf_count}</font></a>`
      }
      else
      {
        result += `<font color="black">${sjf_count}</font></a>`
      }
    }
    else
    {
      result += `<font color="black">&nbsp&nbsp${sjf_count}</font></a>`
    }
    temp[minLocation]=-1
    }
    result += `</div>`
    break

    case("Round_Robin"):
    result = ""
    job_time_remain = []
    var iterator = 0
    var atleastone
    let r_count=0
    //first row
    for(let a =0; a<jobs_number;a++)
    {
      job_time_remain[a] = input_data[a]
    }
    result += `<div class="row">`
    result += `<a class="red darken-1 btn">`
    result += `&nbsp&nbsp&nbsp&nbsp&nbspProcess:</a>`
    while(true)
    {
      if(job_time_remain[iterator%jobs_number]<=0)
      {
        iterator++;
        continue
      }
      else
      {
        if(job_time_remain[iterator%jobs_number]>quantam_number)
        {
          result += `<a class="red darken-1 btn">`
          result += `&nbsp&nbsp`
          result += `P${iterator%jobs_number}</a>`
        }
        else
        {
          result += `<a class="red darken-1 btn">`
          result += `P${iterator%jobs_number}</a>`
        }
        job_time_remain[iterator%jobs_number]=job_time_remain[iterator%jobs_number]-quantam_number
        iterator++
      }
      atleastone = false
      for(let i=0;i<jobs_number;i++)
    {
      if(job_time_remain[i]>0)
      {
        atleastone = true
      }
    }
    if(atleastone == false)
    {
      break;
    }
    }
    result += `</div>`
    //second row
    for(let a =0; a<jobs_number;a++)
    {
      job_time_remain[a] = input_data[a]
    }
    result += `<div class="row">`
    result += `<a class="lime lighten-5 btn">`
    result += `<font color="black">&nbspSize(space):</font></a>`
    while(true)
    {
      if(job_time_remain[iterator%jobs_number]<=0)
      {
        iterator++;
        continue
      }
      else
      {
        if(job_time_remain[iterator%jobs_number]>quantam_number)
        {
          result += `<a class="lime lighten-5 btn">`
          result += `&nbsp&nbsp`
          if(iterator%jobs_number<10)
          {
            result += `&nbsp&nbsp`
          }
          if(iterator%jobs_number>=10)
          {
            result += `&nbsp&nbsp&nbsp&nbsp`
          }
          result += `<font color="black">${quantam_number}</font></a>`
        }
        else
        {
          result += `<a class="lime lighten-5 btn">`
          if(iterator%jobs_number<10)
          {
            result += `&nbsp&nbsp`
          }
          if(iterator%jobs_number>=10)
          {
            result += `&nbsp&nbsp&nbsp&nbsp`
          }
          result += `<font color="black">${job_time_remain[iterator%jobs_number]}</font></a>`
        }
        job_time_remain[iterator%jobs_number]=job_time_remain[iterator%jobs_number]-quantam_number
        iterator++
      }
      atleastone = false
      for(let i=0;i<jobs_number;i++)
    {
      if(job_time_remain[i]>0)
      {
        atleastone = true
      }
    }
    if(atleastone == false)
    {
      break;
    }
    }
    result += `</div>`
    //third row
    for(let a =0; a<jobs_number;a++)
    {
      job_time_remain[a] = input_data[a]
    }
    result += `<div class="row">`
    result += `<a class="grey lighten-4 btn">`
    result += `<font color="black">Time(space):</font></a>`
    while(true)
    {
      if(job_time_remain[iterator%jobs_number]<=0)
      {
        iterator++;
        continue
      }
      else
      {
        if(job_time_remain[iterator%jobs_number]>quantam_number)
        {
          r_count+=quantam_number
          result += `<a class="grey lighten-4 btn">`
          result += `&nbsp&nbsp`
          if(r_count>9)
          {
            if(iterator%jobs_number>=10)
            {
            result += `&nbsp&nbsp`
            }
          }
          else
          {
            if(iterator%jobs_number<10)
            {
            result += `&nbsp&nbsp`
            }
            if(iterator%jobs_number>=10)
            {
            result += `&nbsp&nbsp&nbsp&nbsp`
            }
          }
          result += `<font color="black">${r_count}</font></a>`
        }
        else
        {
          r_count+=job_time_remain[iterator%jobs_number]
          result += `<a class="grey lighten-4 btn">`
          if(r_count>9)
          {
            if(iterator%jobs_number>=10)
            {
            result += `&nbsp&nbsp`
            }
          }
          else
          {
            if(iterator%jobs_number<10)
            {
            result += `&nbsp&nbsp`
            }
            if(iterator%jobs_number>=10)
            {
            result += `&nbsp&nbsp&nbsp&nbsp`
            }
          }
          result += `<font color="black">${r_count}</font></a>`
        }
        job_time_remain[iterator%jobs_number]=job_time_remain[iterator%jobs_number]-quantam_number
        iterator++
      }
      atleastone = false
      for(let i=0;i<jobs_number;i++)
    {
      if(job_time_remain[i]>0)
      {
        atleastone = true
      }
    }
    if(atleastone == false)
    {
      break;
    }
    }
    result += `</div>`
    break//break switch
  }
  
 
  $("#output",window.parent.frames[1].document).append(result)
  //show basic frame1
  $("#output",window.parent.frames[1].document).show()
}
