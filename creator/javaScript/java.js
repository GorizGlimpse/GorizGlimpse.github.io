let finalDobbledArray =[];
//#region INPUT data and DOBBLE creation And RETURN it
let inputTOP = [];
let inputBOT = [];
let divCounter =1;
let emptyTOPText = "TOPthisInputCurrentlyIsEmptyqhstxlew";
let emptyBOTText = "BOTthisInputCurrentlyIsEmptyqhstxlew";
let limitedFileSize = 5;
let defultText = "Glimpse";
let defultPictureText = "تصوير پيش فرض";
//#region defult picture
let defultPicture = bigData.defultimg;
//#endregion
let currentState = "";
let deletedText = "THISisDeleted";
let haveRemoved = 0;
let containsEmptyText = false;
let emptyInputBorder = "border border-danger border-3 border-start-0 border-end-0"
let fileDeleteQ = "ايا مطمئنيد كه ميخواهيد فايل را حذف كنيد ؟"
let modeTwoSidedTextTXT ="حالت دو طرفه";
let modeOnesidedDefultTextTXT = "حالت يك طرفه | متن پيش فرض";
let modeOnesidedDefultPictureTextTXT = "حالت يك طرفه | تصوير پيش فرض";
let sampleDivOpeningTag = '<div class="row p-2 sample" id="sample" >';
let needToCompleteAllFiledMessage= "لطفا تمامي فيلد ها را براي ادامه تكميل كنيد!";
let dataAreCompletedCanCountinue = "ميتوانيد ادامه دهيد يا تغيير دهيد";
let previewImgWidth = 200;
let changedDefultText = false;
let numberDataDetails = [[3, 4, 6, 8, 12, 14, 18, 20],
                    [7, 13, 31, 57, 133, 183, 307, 381]];
let dataArray = numberDataDetails[1];
// select all text on focus
$(document).ready(function() {
  $("input:text").focus(function() { $(this).select(); } );
});
$(window).on('load', function() {
  $(".starterPage").fadeOut(1);
  $(".starterPage").fadeIn(600);
});
window.onbeforeunload = function() {
  return " are you sure ? ";
};
// file upload to arrays
function addFileTOP(input) {
  if (input.files && input.files[0]) {
    // check file size
    var filesize = ((input.files[0].size/1024)/1024).toFixed(4);
    if (filesize > limitedFileSize) {
      alert("حجم فایل انتخابی بیشتر از "+limitedFileSize.toString()+" مگابایت می باشد ! ");
      return;
    }else{
      var reader = new FileReader();
    reader.onload = function (e) {
      var indexnumber = parseInt((input.className.split(" ")[1]).replace(/number/g,""));
      //set image data in top array
      inputTOP[indexnumber-1] = e.target.result;
      //show image delete button
      $(".fileUploaderDeleterBtnTOP"+"."+(input.className.split(" ")[1])).css("display", "inline");
      //disable and set file name to textbox
      $("input.form-control."+ "number"+indexnumber.toString()+":text").val(input.files[0].name).attr("disabled", "disabled");
      // remove empty border if available
      $("input.form-control."+ "number"+indexnumber.toString()+":text").removeClass(emptyInputBorder);
      containsEmptyText = false;
      // if this is last row witch we are input it , add amother row
      if ( indexnumber+1==divCounter) {
        createNewInput();
        if ($("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").val() == "") {
          containsEmptyText = true;
          $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").addClass(emptyInputBorder);
        }
      }
      // update the countinue checker
      modeSelector(currentState);
      countinueChecker();
    };
    reader.readAsDataURL(input.files[0]);
    }
  }
}
function addFileBOT(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    //check file size
    var filesize = ((input.files[0].size/1024)/1024).toFixed(4);
    if (filesize > limitedFileSize) {
      alert("حجم فایل انتخابی بیشتر از "+limitedFileSize.toString()+" مگابایت می باشد ! ");
      return;
    }else{
      reader.onload = function (e) {
        var indexnumber = parseInt((input.className.split(" ")[1]).replace(/number/g,""));
        // ste index of array to image in string64
        inputBOT[indexnumber-1] = e.target.result;
        // show delete file button
        $(".fileUploaderDeleterBtnBOT"+"."+(input.className.split(" ")[1])).css("display", "inline");
        //set textbox name and disable it
        $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").val(input.files[0].name).attr("disabled", "disabled");
        //add empty textbox border
        $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").removeClass(emptyInputBorder);
        containsEmptyText = false;
        // if this is last row witch we are input it , add amother row
        if ( indexnumber+1==divCounter) {
          createNewInput();
          // if top one of this was empty add border for it
          if ($("input.form-control."+ "number"+indexnumber.toString()+":text").val() == "") {
            containsEmptyText = true;
            $("input.form-control."+ "number"+indexnumber.toString()+":text").addClass(emptyInputBorder);
          }
      }
      // update countinue checker
      modeSelector(currentState);
      countinueChecker();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
// do click on hidden file upload with button click
function performClick(elemId) {
    var elem = document.getElementById(elemId);
    if(elem && document.createEvent) {
       var evt = document.createEvent("MouseEvents");
       evt.initEvent("click", true, false);
       elem.dispatchEvent(evt);
    }
}

//create new row for input
function createNewInput() { 
  // push empty data to arrays
  inputTOP.push(emptyTOPText);
  inputBOT.push(emptyBOTText);
  //get then replace sample part
  var original = document.getElementById("sample").innerHTML;
  var x = (sampleDivOpeningTag+original+'</div>').replace(/sample/g,'number'+divCounter);
  // add new input row to scrollable area
  $(".scrollableArea").prepend(x);

  $("button.btn.deleterowBTN."+ "number"+(divCounter-1).toString()+"BOTT:button").removeAttr("hidden");

  // if this is first row < delete row deleter button!
  if (divCounter <=1) {
    $("button.btn.deleterowBTN."+ "number"+divCounter.toString()+"BOTT:button").remove();
  }
  modeSelector(currentState);
  divCounter++; 
}

// add new row or no check on top
function addORnoTOP(inputvalue,thi) {
  var indexnumber = parseInt((thi.className.split(" ")[1]).replace(/number/g,""));
  if (inputvalue != "" && indexnumber+1==divCounter) {
    createNewInput();
  }
  if (inputvalue != "") {
    inputTOP[indexnumber-1] = inputvalue;
  }
  //check for is top or bot empty or no them if true add border
  $(thi).removeClass(emptyInputBorder);
  containsEmptyText = false;
  if ($("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").val() == "") {
    containsEmptyText = true;
    $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").addClass(emptyInputBorder);
  }
  if ($(thi).val() == "") {
    containsEmptyText = true;
    $("input.form-control."+ "number"+indexnumber.toString()+":text").addClass(emptyInputBorder);
  }
  countinueChecker();
}
// add new row or no check on bottom
function addORnoBOT(inputvalue,thi) {
  var indexnumber = parseInt((thi.className.split(" ")[1]).replace(/number/g,""));
  if (inputvalue != "" && indexnumber+1==divCounter) {
    createNewInput();
  }
  if (inputvalue != "") {
    inputBOT[indexnumber-1] = inputvalue;
  }
  $(thi).removeClass(emptyInputBorder);
  containsEmptyText = false;
  if ($("input.form-control."+ "number"+indexnumber.toString()+":text").val() == "") {
    containsEmptyText = true;
    $("input.form-control."+ "number"+indexnumber.toString()+":text").addClass(emptyInputBorder);
  }
  if ($(thi).val() == "") {
    containsEmptyText = true;
    $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").addClass(emptyInputBorder);
  }
  countinueChecker()
}

// delete file for top
function deleteFileTOP(thi) {
  // ask a Q
  if (confirm(fileDeleteQ)) {
    var indexnumber = ((thi.className.split(" ")[1]).replace(/number/g,""));
    /// empty cr index in array
    inputTOP[indexnumber-1] = emptyTOPText;
    thi.style.display = "none";
    //change css to back
    $("input.form-control."+ "number"+indexnumber.toString()+":text").val("").removeAttr("disabled");
    $("input.form-control."+ "number"+indexnumber.toString()+":text").addClass(emptyInputBorder);
    modeSelector(currentState);
  }
}
// delete file for bottom
function deleteFileBOT(thi) {
  // ask a Q
  if (confirm(fileDeleteQ)) {
    var indexnumber = ((thi.className.split(" ")[1]).replace(/number/g,"").replace(/BOT/g,""));
    /// empty cr index in array
    inputBOT[indexnumber-1] = emptyBOTText;
    thi.style.display = "none";
    //change css to back
    $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").val("").removeAttr("disabled");
    $("input.form-control."+ "number"+indexnumber.toString()+"BOT:text").addClass(emptyInputBorder);
    modeSelector(currentState);
  }
}

//mode selcting at first
function modeSelector(mode) {
  if (mode == 'twoSided') {
    currentState = 'twoSided';
    document.getElementById("dropdownMenuLinkTXT").innerHTML = modeTwoSidedTextTXT;
    for (let index = 0; index < divCounter; index++) {
      $("input.form-control."+ "number"+index.toString()+"BOT:text").removeAttr("disabled");
      $("button.btn."+ "number"+index.toString()+"BOT:button").prop("disabled", false);
    }
  }else if (mode == 'oneSidedText') {
    if (changedDefultText==false) {
      defultText=prompt("متن پیش فرض را وارد کنید", "Glimpse");
      changedDefultText=true;
    }
    

    currentState = 'oneSidedText';
    document.getElementById("dropdownMenuLinkTXT").innerHTML = modeOnesidedDefultTextTXT;
    for (let index = 0; index < divCounter; index++) {
      $("input.form-control."+ "number"+index.toString()+"BOT:text").val(defultText).attr("disabled", "disabled");
      $("button.btn."+ "number"+index.toString()+"BOT:button").prop("disabled", true);
      if (index <divCounter-haveRemoved) {
        if (inputBOT[index] != deletedText) {
          inputBOT[index] = defultText;
        }
      }
    }
    if (inputBOT.length > inputTOP.length) {
      inputBOT.pop();
    }
    inputBOT[inputBOT.length-1] = emptyBOTText;
  }else if (mode == 'oneSidedPicture') {
    currentState = 'oneSidedPicture';
    document.getElementById("dropdownMenuLinkTXT").innerHTML =modeOnesidedDefultPictureTextTXT ;
    for (let index = 0; index < divCounter; index++) {
      $("input.form-control."+ "number"+index.toString()+"BOT:text").val(defultPictureText).attr("disabled", "disabled");
      $("button.btn."+ "number"+index.toString()+"BOT:button").prop("disabled", true);
      if (inputBOT[index] != deletedText) {
        inputBOT[index] = defultPicture;
      }
    }
    if (inputBOT.length > inputTOP.length) {
      inputBOT.pop();
    }
    inputBOT[inputBOT.length-1] = emptyBOTText;
  }else{
  }
  $(document).ready(function() {
    $("input:text").focus(function() { $(this).select(); } );
  });
  //$(".drpd,.cardModeBTNtext").prop("disabled", true);
}
// if there were not any choose chose two side mode
function changed() {
  if (currentState=="") {
    currentState = 'twoSided';
  }
  modeSelector(currentState);
}

//delete selected row
function deleteROW(thi) {
  var indexnumber = Number(((thi.className.split(" ")[1]).replace(/number/g,"")).replace(/BOTT/g,""));
  inputBOT[indexnumber-1] =deletedText;
  inputTOP[indexnumber-1] =deletedText;
  $(thi).parent().parent().remove();
  haveRemoved++;
  countinueChecker();
}

// check for can countinue or no and if not , how many need to remove or add
function countinueChecker() {
  let crnum = divCounter-3-haveRemoved;
  var closest = dataArray.reduce(function(prev, curr) {
    return (Math.abs(curr - crnum) < Math.abs(prev - crnum) ? curr : prev);
  });
  let l =0;
  let h =0;
  if (closest > crnum) {
    h = closest;
    l = (dataArray[dataArray.indexOf(closest)-1]);
    if ((dataArray.indexOf(closest)-1) <0) {
      l = 0;
    }
  }else{
    l = closest;
    h = (dataArray[dataArray.indexOf(closest)+1]);
    if (closest >=dataArray[dataArray.length-1]) {
      h = dataArray[dataArray.length-1];
    }
  }
  let havetoLow = crnum-l+1;
  let haveToadd = h-crnum-1;
  $(".countinueBTN").prop("disabled", true);
  $(".needtoaddorremove").text(" شما ميبايست يا "+(h-crnum-1).toString()+" مورد ديگر اضافه كنيد و يا "+(crnum-l+1).toString()+" مورد را كم كنيد");
  if(crnum<dataArray[0]){
    $(".needtoaddorremove").text(" شما ميبايست  "+(h-crnum-1).toString()+" مورد ديگر اضافه كنيد  ");
  }
  if (haveToadd == 0 ) {
    let inr = document.getElementById("dataPage").innerHTML;
    if (inr.includes(emptyInputBorder)) {
      $(".needtoaddorremove").text(needToCompleteAllFiledMessage);
    }else{
      $(".needtoaddorremove").text(dataAreCompletedCanCountinue);
    $(".countinueBTN").prop("disabled", false);
    }
  }
}

//show preview image for uploaded file on mouse enter to input gruop top
function showPRIMGTOP(ths,evnt){
  var indexnumber = Number((ths.className.split(" ")[3]).replace(/number/g,""))-1;
  var x= evnt.clientX;
  var y = evnt.clientY;
  var crelemnt = inputTOP[indexnumber];
  if (crelemnt.includes("data:image")) {
    $(".previewIMGplacehodler").removeAttr("hidden").attr('src',crelemnt).css({top: y, left: x-previewImgWidth, position:'fixed',width: previewImgWidth});
  }
}
//show preview image for uploaded file on mouse enter to input gruop bottom
function showPRIMGBOT(ths,evnt){
  if (currentState=="twoSided") {
    var indexnumber = Number((ths.className.split(" ")[3]).replace(/number/g,"").replace(/BOT/g,""))-1;
    var x= evnt.clientX;
    var y = evnt.clientY;
    var crelemnt = inputBOT[indexnumber];
    if (crelemnt.includes("data:image")) {
      $(".previewIMGplacehodler").removeAttr("hidden").attr('src',crelemnt).css({top: y, left: x-previewImgWidth, position:'fixed',width: previewImgWidth});
    }
  }
  
}

// hide preview image
function hidePRIMG() {
  $(".previewIMGplacehodler").attr("hidden", "hidden");
}

// log final arrays and return them
function final() {
  
  let finalTOParray = [];
  if (inputTOP.includes(deletedText)) {
    for (let i = 0; i < inputTOP.length; i++) {
      var el = inputTOP[i];
      if (el != deletedText) {
        finalTOParray.push(el);
      }
    }
  }else{finalTOParray = inputTOP;}
  let finalBOTarray = [];
  if (inputBOT.includes(deletedText)) {
    for (let i = 0; i < inputBOT.length; i++) {
      var element = inputBOT[i];
      if (element != deletedText) {
        finalBOTarray.push(element);
      }
    }
  }else{finalBOTarray = inputBOT;}
  if (finalTOParray[finalTOParray.length-1] == emptyTOPText ) {
    finalTOParray.pop();
  } else {
    if (finalTOParray.length == finalBOTarray.length && dataArray.includes(finalTOParray.length)) {
      finalDobbleCreator([finalTOParray,finalBOTarray]);
    }else{console.error("Invalid input data , please try again later");}
  }if (finalBOTarray[finalBOTarray.length-1] == emptyBOTText) {
    finalBOTarray.pop();
  }
  finalDobbleCreator([finalTOParray,finalBOTarray]);
}

//pagination
function goToDataPage(ths) {
  if (currentState == "") {
    alert("لطفا برای ادامه حالت کارت را انتخاب کنید");
  }else{
    $(".starterPage").animate({
      left: ($(window). width())/2 - $(".starterPage").width()/2,
       opacity: '0',

    },function(){
      $(".starterPage").css("display","none");
      $(".dataPage").css("display","block");
      $(".dataPage").animate({
         opacity: '1'
      })
    });

    
    //$(".starterPage").css("display","none");
    //$(".dataPage").css("display","block");
  }
  
}

//dobble creation
function dobbleFormCreator(inputArray) {
    var N = objOnEachCard(inputArray);
    const finalArr = [];
    // Generate series from #01 to #N
    for (let i = 0; i <= N - 1; i++) {
        const rowToAdd = [];
        rowToAdd.push(inputArray[0]);
        for (let i2 = 1; i2 <= N - 1; i2++) {
            rowToAdd.push(inputArray[((N - 1) + (N - 1) * (i - 1) + (i2 + 1)) - 1]);
        }
        finalArr.push(rowToAdd);
    }
    // Generate series from #N+1 to #N+(N-1)*(N-1)
    for (let i = 1; i <= N - 1; i++) {
        for (let i2 = 1; i2 <= N - 1; i2++) {
            const s = [];
            s.push(inputArray[(i + 1) - 1]);
            for (i3 = 1; i3 <= N - 1; i3++) {
                s.push(inputArray[((N + 1) + (N - 1) * (i3 - 1) + (((i - 1) * (i3 - 1) + (i2 - 1))) % (N - 1)) - 1]);
            }
            finalArr.push(s);
        }
    }
    return finalArr;
}
function objOnEachCard(array) {
    let length = array.length;
    let index_number = numberDataDetails[1].indexOf(length);
    return numberDataDetails[0][index_number];
}
function printTest(array) {
    for (let i = 0; i < array[0].length; i++) {
        let top_side = array[0][i];
        let dwn_side = array[1][i];
        document.write("card number :" + (i+1) + " : <br>");
        document.write("top side : " + top_side + "<br>");
        document.write("dwn side :" + dwn_side + "<br>");
        document.write("     <br>");
    }
}
var finalData;
//finalize every think
function finalDobbleCreator(userArray) {
    let index_0 = dobbleFormCreator(userArray[0]);
    let index_1 = dobbleFormCreator(userArray[1]);
    finalDobbledArray = [index_0, index_1];

    $(".dataPage").animate({
      left: ($(window). width())/2 - $(".dataPage").width()/2,
       opacity: '0',

    },function(){
      $(".dataPage").css("display","none");
      $(".configPage").css("display","block").css("top",($(".waiter").height())*1.5+"px");
      $(".body").css("background-image","url(./images/hero-bg-fliped.png)");
      $(".waiter").css("display","block");
      $(".configPage").animate({
         opacity: '1'
      },function(){
        $(".doitoder").click();
        $(".waiter").css("display","none");
        $(".configPage").css("top","0px");
      })
    });

    //$(".dataPage").css("display","none");
    //$(".configPage").css("display","block");
    finalData = {
      dt : finalDobbledArray,
      mode : currentState
    };
    return [index_0, index_1];
}
function returnToBack() {

  $(".configPage").animate({
     opacity: '0',

  },function(){
    $(".configPage").css("display","none");
    $(".dataPage").css("opacity","0");
    $(".dataPage").css("display","block");
    $(".dataPage").animate({
      left: 0,
       opacity: '1'
    })
  });

  //$(".configPage").css("display","none");
  //$(".dataPage").css("display","block");
}
//#endregion




