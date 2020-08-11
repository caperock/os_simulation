var frames = []
var reference = []
var hits = []
var victim = []
var track = 0
var hit_count = 0
var fault_count = 0
var random_value = []
var algorithm_name


//Hide the frame[1] at the beginning
$("#output",window.parent.frames[1].document).hide()
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
  //read the number of page Frames
  frame_number = parseInt($("#frameCount").val())
  //read the algorithm
var radios = document.getElementsByName('Algorithm')
//IF statement to check choice
  if (radios[0].checked) 
  {
    algorithm="opt"
    algorithm_name = "Optimal"
  }
  if (radios[1].checked) 
  {
    algorithm="sc"
    algorithm_name = "Second Chance"
  }
  if (radios[2].checked) 
  {
    algorithm="fifo"
    algorithm_name = "First in First out"
  }if (radios[3].checked) 
  {
    algorithm="lru"
    algorithm_name = "Least Recently Used"
  }
  //Starting to make figure for frame1
  Draw_Frame1(algorithm, frame_number, input_data)
})
//produce random number for input_sequence
$("#random").click(function () {
  for (let i = 0; i < 21; i++)
  {
    random_value[i]=Math.floor(Math.random() * 7) + 1
  }
   $("#input_sequence").val(random_value)
})

function Draw_Frame1(algorithm, frame_number, input_data) {
  //refersh the frame1
  $("#output",window.parent.frames[1].document).html("")
  //construct the tittle
  let tittle = `
    <div class="card-panel grey lighten-3"><div class="row"><font size="3">
      <div class="col s12"><center><font size="5">${algorithm_name}</font></center></div>
      <div class="col s9">Hits: <span class="flow-text" id="hits"></span></div>
      <div class="col s3">Faults: <span class="flow-text" id="faults"></span></div>
      <div class="col s9">Hit Rate: <span class="flow-text" id="hitRate"></span></div>
      <div class="col s3">Fault Rate: <span class="flow-text" id="faultRate"></span></div>
    </font></div></div>
      `
  //Constuct body
  let columns = input_data.length
  let rows = ""
  let rowTime = "<tr><td>Time</td>"

  //Constuct header row
  for (let i = 0; i <= columns; i++) {
    rowTime += `<td><span class="header" id="header-${i}">T${i}</td>`
  }
  rowTime += "</tr>"
  rows += rowTime

  //Constuct refrence number row
  let rowRef = `<tr><td>Reference</td><td><span></span></td>`
  for (let i = 0; i < columns; i++) {
    rowRef += `<td><div class="card-panel lime lighten-5"><span class="ref" id="ref-${i}">${input_data[i]}</div></td>`
  }
  rowRef += "</tr>"
  rows += rowRef

  //Constuct Frame Rows
  for (let i = 0; i < frame_number; i++) {
    let row = `<tr><td>Frame_${i}</td><td><span></span></td>`
    for (let j = 0; j < columns; j++) {
      row += `<td><span class="frame" id="frame-${i}-time-${j}"></span></td>`
    }
    row += "</tr>"
    rows += row
  }

  //Constuct victim row
  let rowV = `<tr><td>Victim(V)</td><td><span></span></td>`
  for (let i = 0; i < columns; i++) {
    rowV += `<td><span class="victim" id="victim-${i}"></span></td>`
  }
  rowV += "</tr>"
  rows += rowV

  //Constuct Hit Row
  let rowHit = `<tr><td>Status/Hit(H)</td><td><span></span></td>`
  for (let i = 0; i < columns; i++) {
    rowHit += `<td><span class="hit" id="hit-${i}"></span></td>`
  }
  rowHit += "</tr>"
  rows += rowHit
  //Constuct option button for track, forward backward show all
  let track_option = `
  <table class="responsive-table centered">${rows}</span></table><br/>
  <div class="row">
    <div class="col s4"></div>
      <div class="col s2"><button class="waves-effect waves-light btn-large" id="backward"><<< Backward
    </button></div>
      <div class="col s2"><button class="waves-effect waves-light btn-large" id="forward">Forward >>>
    </button></div>
    <div  class="col s4"><div style="float:right"><button class="waves-effect waves-light btn-large" id="AllIn">Show All
    </button></div></div>
</div>
  `
  //insert tittle and button
  $("#output",window.parent.frames[1].document).append(tittle).append(track_option)
  //show basic frame1
  $("#output",window.parent.frames[1].document).show()
  //backward function
  $("#backward",window.parent.frames[1].document).click(function () {
    back(algorithm)
  })
  //forward function
  $("#forward",window.parent.frames[1].document).click(function () {
    front(algorithm)
  })
  //showall function
   $("#AllIn",window.parent.frames[1].document).click(function () {
    Show_All(algorithm)
  })
  Compute_algorithm(algorithm, frame_number, input_data)
}



function Compute_algorithm(algorithm, frame_number, input_data) {
  //intial data
  hits = []
  frames = []
  victim = []
  reference = []
  track = 0
  hit_count = 0
  fault_count = 0

  // Initialize frames to -1
  for (let frame = 0; frame < frame_number; frame++) {
    frames[frame] = []
    for (let time = 0; time < input_data.length; time++) {
      frames[frame][time] = -1
    }
  }
  //initialize hits and vs to -1
  for (let time = 0; time < input_data.length; time++) {
    hits[time] = -1
    victim[time] = -1
  }
  //initialize frame reference bits to 0
  for (let frame = 0; frame < frame_number; frame++) {
    reference[frame] = []
    for (let time = 0; time < input_data.length; time++) {
      reference[frame][time] = 0
    }
  }
  console.log(frames)
  // -1 denotes an empty cell
  switch (algorithm) {
    case 'opt':
      opt(frame_number, input_data)
      break;
    case 'sc':
      sc(frame_number, input_data)
      break;
    case 'fifo':
      fifo(frame_number, input_data)
      break;
    case 'lru':
      lru(frame_number, input_data)
      break;
    default:
      console.log("Invalid Algorithm!")
      break;
  }
}

// First In First Out algorithm
function fifo(frame_number, input_data) {
  // Insert first ref
  frames[0][0] = input_data[0]
  for (let time = 1; time < input_data.length; time++) {
    //Copy frames from previous time
    for (let f = 0; f < frames.length; f++)
      frames[f][time] = frames[f][time - 1]
    // Check for hits and faults
    for (let f = 0; f < frame_number; f++)
      if (frames[f][time] == input_data[time])
        // the hit value at this point in time is set to the frame the hit was found in
        // so we know which cell to color green when the time comes
        hits[time] = f
    // Only do the insertion if there wasn't a hit
    if (hits[time] == -1) {
      // Set new victim from last
      victim[time] = frames[frame_number - 1][time]
      //shift frames downward, excluding the first one
      for (let f = frame_number - 1; f > 0; f--)
        frames[f][time] = frames[f - 1][time]
      // setting the first frame value to the new ref from the input_data
      frames[0][time] = input_data[time]
    }
  }
}

function lru(frame_number, input_data) {
  // Insert first ref
  frames[0][0] = input_data[0]
  for (let time = 1; time < input_data.length; time++) {
    //Copy frames from previous time
    for (let f = 0; f < frames.length; f++)
      frames[f][time] = frames[f][time - 1]
    // Check for hits and faults
    for (let f = 0; f < frame_number; f++)
      if (frames[f][time] == input_data[time])
        // the hit value at this point in time is set to the frame the hit was found in
        // so we know which cell to color green when the time comes
        hits[time] = f
    // Only do the insertion if there wasn't a hit
    if (hits[time] == -1) {
      // Set new victim from last
      victim[time] = frames[frame_number - 1][time]
      //shift frames downward, excluding the first one
      for (let f = frame_number - 1; f > 0; f--)
        frames[f][time] = frames[f - 1][time]
      // setting the first frame value to the new ref from the input_data
      frames[0][time] = input_data[time]
    } else {

      //clear victim at time
      victim[time] = -1
      // shift all frames down
      for (let f = hits[time]; f > 0; f--)
        frames[f][time] = frames[f - 1][time]
      //set first frame value at current time to hit value
      frames[0][time] = input_data[time]
    }
    for (let h = 0; h < hits.length; h++) {
      if (hits[h] > -1) {
        hits[h] = 0;
      }
    }
  }
}

function opt(frame_number, input_data) {
  // Insert first ref
  frames[0][0] = input_data[0]
  for (let time = 1; time < input_data.length; time++) {
    //Copy frames from previous time
    for (let f = 0; f < frames.length; f++)
      frames[f][time] = frames[f][time - 1]
    // Check for hits and faults
    for (let f = 0; f < frame_number; f++)
      if (frames[f][time] == input_data[time])
        // the hit value at this point in time is set to the frame the hit was found in
        // so we know which cell to color green when the time comes
        hits[time] = f
    // Only do the insertion if there wasn't a hit
    if (hits[time] == -1) {
      if (hasFreeSpace(time, frame_number)) {
        victim[time] = frames[frame_number - 1][time]
        //shift frames downward, excluding the first one
        for (let f = frame_number - 1; f > 0; f--)
          frames[f][time] = frames[f - 1][time]
        // setting the first frame value to the new ref from the input_data
        frames[0][time] = input_data[time]
      } else {
        let furthest = []

        // Store the index of the next occurance of each frame element in the input_data, or -1 if the element does not exist in future indices
        for (let f = 0; f < frame_number; f++) {
          furthest[f] = input_data.indexOf(frames[f][time], time + 1)
        }
        // furthest = any nonexistent future element (indexOf == -1), and if indexOf(-1) returns -1, just use the indexOf the max value (value being index of next occurance)
        let fu = furthest.indexOf(-1)
        // if there is at least one occurance of each frame value in the future, pick the furthest one away, otherwise use the first one that doesn't occur in the future
        if (fu == -1)
          fu = furthest.indexOf(Math.max(...furthest))
        // Set new victim to the furthest frame value
        victim[time] = frames[fu][time]
        // shift all frames down to make room for the new insertion at f0
        for (let f = fu; f > 0; f--)
          frames[f][time] = frames[f - 1][time]
        // shift all frames down
        frames[0][time] = input_data[time]
      }
    } else {
      //clear victim at time
      victim[time] = -1
      // Do nothing else because there was a hit
    }
  }
}

// Second chance
function sc(frame_number, input_data) {
  // Insert first ref
  frames[0][0] = input_data[0]
  for (let time = 1; time < input_data.length; time++) {
    //Copy frames from previous time
    for (let f = 0; f < frames.length; f++)
      frames[f][time] = frames[f][time - 1]
    //copy reference bits from previous time
    for (let f = 0; f < frames.length; f++)
      reference[f][time] = reference[f][time - 1]
    // Check for hits and faults
    for (let f = 0; f < frame_number; f++)
      if (frames[f][time] == input_data[time]) {
        // the hit value at this point in time is set to the frame the hit was found in
        // so we know which cell to color green when the time comes
        hits[time] = f
        // Since there was a hit, set the hit's reference bit to 1
        reference[f][time] = 1
        break
      }
    // Only do the insertion if there wasn't a hit
    if (hits[time] == -1) {
      if (hasFreeSpace(time, frame_number)) {
        // Set new victim from last
        victim[time] = frames[frame_number - 1][time]
        //shift frames downward, excluding the first one
        for (let f = frame_number - 1; f > 0; f--) {
          frames[f][time] = frames[f - 1][time]
          reference[f][time] = reference[f - 1][time]
        }
        // setting the first frame value to the new ref from the input_data
        frames[0][time] = input_data[time]
        // Initializing the default reference bit value for the new page
        reference[0][time] = 0
      } else {
        let toReplace = -1
        let secondChance = -1
        for (let f = frame_number - 1; f > 0; f--) {
          if (reference[f][time] == 0) {
            toReplace = f
            break
          } else {
            secondChance = f
          }
        }
        //set victim to the value being replaced
        if (secondChance != -1)
          reference[secondChance][time] = 0
        victim[time] = frames[toReplace][time]
        // Perform the replacement
        //frames[toReplace][time] = input_data[time]
        // shift all frames down
        for (let f = toReplace; f > 0; f--) {
          frames[f][time] = frames[f - 1][time]
          reference[f][time] = reference[f - 1][time]
        }
        // Insert next frame and set reference bit to 0
        frames[0][time] = input_data[time]
        reference[0][time] = 0
      }
    }
  }
}


function Show_All(algorithm) {
  while (track < hits.length) {
    // Hide the frames, set their contents, then animate them to be visible again
    for (let frame = 0; frame < frames.length; frame++) {
      $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).parent().hide()
      // Second Chance algorithm has a special table layout, subscripts for the Reference Bit
      if (algorithm != "sc")
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : frames[frame][track])
      else
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : (frames[frame][track] + `<sub>${reference[frame][track]}</sub>`))
      $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).parent().show(500)
    }
    // Hide the track cell for the current tick
    $(`#hit-${track}`,window.parent.frames[1].document).parent().hide()
    // Set track cell color based on the value in the hits array at the current tick
    if (hits[track] > -1) {
      $(`#frame-${hits[track]}-time-${track}`,window.parent.frames[1].document).parent().addClass("for_hit")
      hit_count++
    } else {
      fault_count++
    }
    // Set hit cell content and animate to be visible
    $(`#hit-${track}`,window.parent.frames[1].document).html(hits[track] != -1 ? "Hit" : "")
    $(`#hit-${track}`,window.parent.frames[1].document).parent().show(500)
    // Hide, set, and show output cell for this tick
    $(`#victim-${track}`,window.parent.frames[1].document).parent().hide()
    $(`#victim-${track}`,window.parent.frames[1].document).html(victim[track] == -1 ? "" : "V("+victim[track]+")")
    $(`#victim-${track}`,window.parent.frames[1].document).parent().show(500)
    // Update table tittle to reflect the data from the new tick
    $("#hits",window.parent.frames[1].document).html(hit_count)
    $("#faults",window.parent.frames[1].document).html(fault_count)
    $("#hitRate",window.parent.frames[1].document).html(((hit_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
    $("#faultRate",window.parent.frames[1].document).html(((fault_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
    track++
  }
}

function front(algorithm) {

  if (track < hits.length) {
    // Hide the frames, set their contents, then animate them to be visible again
    for (let frame = 0; frame < frames.length; frame++) {
      $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).parent().hide()
      // Second Chance algorithm has a special table layout, subscripts for the Reference Bit
      if (algorithm != "sc")
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : frames[frame][track])
      else
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : (frames[frame][track] + `<sub>${reference[frame][track]}</sub>`))
      $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).parent().show(500)
    }
    // Hide the track cell for the current tick
    $(`#hit-${track}`,window.parent.frames[1].document).parent().hide()
    // Set track cell color based on the value in the hits array at the current tick
    if (hits[track] > -1) {
      $(`#frame-${hits[track]}-time-${track}`,window.parent.frames[1].document).parent().addClass("for_hit")
      hit_count++
    } else {
      fault_count++
    }
    // Set hit cell content and animate to be visible
    $(`#hit-${track}`,window.parent.frames[1].document).html(hits[track] != -1 ? "Hit" : "")
    $(`#hit-${track}`,window.parent.frames[1].document).parent().show(500)
    // Hide, set, and show output cell for this tick
    $(`#victim-${track}`,window.parent.frames[1].document).parent().hide()
    $(`#victim-${track}`,window.parent.frames[1].document).html(victim[track] == -1 ? "" : "V("+victim[track]+")")
    $(`#victim-${track}`,window.parent.frames[1].document).parent().show(500)
    // Update table tittle to reflect the data from the new tick
    $("#hits",window.parent.frames[1].document).html(hit_count)
    $("#faults",window.parent.frames[1].document).html(fault_count)
    $("#hitRate",window.parent.frames[1].document).html(((hit_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
    $("#faultRate",window.parent.frames[1].document).html(((fault_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
    track++
  }
}

function back(algorithm) {
if(track>1)
{
  track--
    // Hide the frames, set their contents, then animate them to be visible again
    for (let frame = 0; frame < frames.length; frame++) {
      $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).parent().hide()
      // Second Chance algorithm has a special table layout, subscripts for the Reference Bit
      if (algorithm != "sc")
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : frames[frame][track])
      else
        $(`#frame-${frame}-time-${track}`,window.parent.frames[1].document).html(frames[frame][track] == -1 ? "" : (frames[frame][track] + `<sub>${reference[frame][track]}</sub>`))
    }
    // Hide the track cell for the current tick
    $(`#hit-${track}`,window.parent.frames[1].document).parent().hide()
    // Set track cell color based on the value in the hits array at the current tick
    if (hits[track] > -1) {
      $(`#frame-${hits[track]}-time-${track}`,window.parent.frames[1].document).parent().addClass("for_hit")
      hit_count--
    }else {
      fault_count--
    }
    // Set hit cell content and animate to be visible
    $(`#hit-${track}`,window.parent.frames[1].document).html(hits[track] != -1 ? "Hit" : "")
    $(`#hit-${track}`,window.parent.frames[1].document).parent().hide()
    // Hide, set, and show output cell for this tick
    $(`#victim-${track}`,window.parent.frames[1].document).html(victim[track] == -1 ? "" : "V("+victim[track]+")")
    $(`#victim-${track}`,window.parent.frames[1].document).parent().hide()
    // Update table tittle to reflect the data from the new tick
    $("#hits",window.parent.frames[1].document).html(hit_count)
    $("#faults",window.parent.frames[1].document).html(fault_count)
    $("#hitRate",window.parent.frames[1].document).html(((hit_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
    $("#faultRate",window.parent.frames[1].document).html(((fault_count / (fault_count + hit_count)) * 100).toFixed(3) + "%")
  }
}





$(document).ready(function () {
  // Initialze Materialize.css components that are utilized
  $('select').formSelect();
  $('.modal').modal();
  M.updateTextFields();
});

function hasFreeSpace(time, frame_number) {
  for (let frame = 0; frame < frame_number; frame++) {
    if (frames[frame][time] == -1)
      return true;
  }
  return false
}

function hideTableData() {
  $(".frame").hide()
  $(".hit").hide()
  $(".victim").hide()
}