let paperHeight = 8419;
let paperWidth = 5953;
let paperColor = "#ffff";
let circleRaduis = 6000;
let cardHeight = 2466;
let mazFontsize = parseInt(cardHeight/11);
let cardWidth = 1587;
let cardBorderSize = 150;
let maxBorderSize = parseInt(cardWidth/10);
let cardBorderColor = "#000000";
let cardEdgeRound = 50;
let cardBackgroundColor = "#faba66";
let cardBackBackgroundColor = "#faba66";
let isCardRounded = true;
let cardModel = "rect";
let alignitem = true;

let colorize = false;

let fontName = "iransansMedium";
let textColor = "#000000";
let fontSize = 120;
let backfontsize = 120;
var scla = 1;

let colNum = 5;

function show(prev) {
    for (let q = 0; q < 100; q++) {$(".backPageNumber"+q).remove();}
    for (let q = 0; q < 100; q++) {$(".frontPageNumber"+q).remove();}
    for (let q = 0; q < 100; q++) {$(".paper").remove();}
    $(".pages").append('<canvas id="paper"class="paper" style="border:1px solid black;"></canvas>');
    settingInitializer(false);    
    if (prev==true) {
        var scl =1;// Math.max($(".pages").width() / paperWidth, $(".pages").height() / paperHeight);
        var xdr = (Math.max($(".pages").width() / paperWidth, $(".pages").height() / paperHeight));
        // $(".paper").css('transform','scale('+xdr+')');
        scl = xdr;
        paperHeight = paperHeight*scl;
        paperWidth = paperWidth*scl;

        cardWidth = cardWidth*scl;
        cardHeight = cardHeight*scl;
        cardBorderSize = cardBorderSize*scl;
        cardEdgeRound = cardEdgeRound*scl;
        fontSize = fontSize*scl;
        backfontsize = backfontsize*scl;
        circleRaduis = circleRaduis*scl;
    }
    


var paperElement = document.getElementById("paper");
var paper = paperElement.getContext("2d");
paper.canvas.height = paperHeight;
paper.canvas.width = paperWidth;
paper.fillStyle = paperColor;
paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);

function checkHowManyCardInWidth(cardW,paperW) {
    var sizeForCheck = cardW + (paperW/90) ; 
    var numberOfCards = 0;
    while (numberOfCards*sizeForCheck < paperW) {
        numberOfCards++;
    }
    return numberOfCards-1;
}
function checkHowManyCardInHeight(cardH,paperH) {
    var sizeForCheck = cardH + (paperH/90) ; 
    var numberOfCards = 0;
    while (numberOfCards*sizeForCheck < paperH) {
        numberOfCards++;
    }
    return numberOfCards-1;
}
function roundRect(x, y, w, h, radius)
{
  var context = paper;
  var r = x + w;
  var b = y + h;
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.fill();
}
function wrapText(context, text, xx, yy, maxWidth, lineHeight,fontSize,maxheight) {
let ctx = context;

// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.
// @param x - the X starting point of the text on the canvas.
// @param y - the Y starting point of the text on the canvas.
// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
const wrapText = function(ctx, text, x, y, maxWidth, lineHeight,maxHeight) {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    var howmanyLines = 1;

    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            howmanyLines++;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    while (howmanyLines*lineHeight >= maxHeight) {
        fontSize--;
        lineHeight = fontSize*1.2;
        ctx.font = parseInt(fontSize).toString()+"px "+fontName;
    }
    lineHeight = fontSize*1.2;
     words = text.split(' ');
     line = ''; // This will store the text of the current line
     testLine = ''; // This will store the text when we add a word, to test if it's too long
     lineArray = []; // This is an array of lines, which the function will return
     x = xx;
     y =yy;
     howmanyLines = 1;
    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            howmanyLines++;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }

    ctx.font = parseInt(fontSize).toString()+"px "+fontName;
    return lineArray;
}
// More text
ctx.font = parseInt(fontSize).toString()+"px "+fontName;
ctx.fillStyle = textColor;
if (colorize==true) {
    ctx.fillStyle = generateRandomColor();
}
let wrappedText = wrapText(ctx, text, xx, yy, maxWidth, fontSize*1.2,maxheight);
wrappedText.forEach(function(item) {
    ctx.fillText(item[0], item[1], item[2]); 
})
    
}
  
function imageScalToFit(img,x,y,w,h,ctx){
    // get the scale
    w = w - (w/4);
    h = h - (h/4);
    y = y -(h/8);
    var scale =Math.max((w/2) / (img.width), (h/2) / (img.height));
    // get the top left position of the image
    // var x = (w / 2) - (img.width / 2) * scale;
    // var y = (h / 2) - (img.height / 2) * scale;
    // ctx.fillRect(x, y, img.width * scale, img.height * scale);


    ctx.drawImage(img, (x-((img.width* scale)/2)), (y-((img.height* scale)/4)), img.width * scale, img.height * scale);
}
function fullBackImage(img,x,y,w,h,ctx,imgstr) {
    var scale =Math.min((w/2) / (img.width), (h/2) / (img.height))*1.5;
    // if (imgstr == bigData.defultimg) {
    //     scale =Math.max((w/2) / (img.width), (h/2) / (img.height))/1.8;
    // }
    
    ctx.drawImage(img, (x+(w/2))-((img.width * scale)/2), (y+(h/2))-((img.height * scale)/2), img.width * scale, img.height * scale);
}
function columnAndRowFinder(number) {
    var objOnEachColumn=colNum;
    var checkingNumber = number;
    if (number % 2 == 1) {checkingNumber = number + 1;}
    var columnNumber = Math.ceil(checkingNumber/objOnEachColumn);
    if (colNum==1) {
        columnNumber=number;
    }
    if (colNum==3 && number==3) {
        columnNumber=1;
    }
    console.log(columnNumber);
    return [columnNumber,objOnEachColumn];
}
function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

function drawCircle(x,y,r) {
    paper.arc(x+(r), y+(r), r, 0, 2 * Math.PI);
}

function cardCreatorTop(topOrBot) {
    for (let i = 0; i < checkHowManyCardInHeight(cardHeight,paperHeight); i++) {
        for (let k = 0; k < checkHowManyCardInWidth(cardWidth,paperWidth); k++) {
            if (cardNumber >= howManyCardIncluded) {break;}
            cardNumber++;

            

            
            var x = ((((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))+cardWidth)*k)+((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))/2;
            var y = ((((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))+cardHeight)*i)+((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))/2;
            paper.beginPath();
            
            paper.lineWidth = cardBorderSize;
            paper.strokeStyle = cardBorderColor;
            paper.fillStyle = cardBackgroundColor;
            
            if (cardModel=="rect") {
                if (isCardRounded) {roundRect(x, y, cardWidth, cardHeight, cardEdgeRound);}
                else{paper.rect(x, y, cardWidth, cardHeight);paper.fill();}
            }else{
                drawCircle(x,y,circleRaduis);paper.fill();
            }
            
            
            paper.stroke();
    
            let currentCardData = data[0][cardNumber-1];
            if (topOrBot==1) {
                 currentCardData = data[1][cardNumber-1];
            }

            
            if (cardModel=="rect") {
                let colAndRom = columnAndRowFinder(currentCardData.length);
            
            let lastIndex = 0 ;
            for (let col =0 ; col < colAndRom[0]; col++) {
                 
                for (var row =0; row < colAndRom[1]; row++) {
                    let crText = currentCardData[lastIndex+ row];
                    if (typeof crText === "undefined") {break;}
                    
                    let textX = (x + (cardWidth/colAndRom[0])*col + (cardWidth/colAndRom[0])/2);
                    let textY = (y + (cardHeight/colAndRom[1])*row + (cardHeight/colAndRom[1])/2);
                    
                    let availableAreaWidth = cardWidth/colAndRom[0];
                    let availableAreaHeight = cardHeight/colAndRom[1];
                    
                    
                    paper.fillStyle = textColor;
                    

                    paper.textAlign = "center";
    
                    if (crText.includes("data:image/")) {
                        var image = new Image();
                        image.src = crText;
                        
                        imageScalToFit(image,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/(15))*3),availableAreaHeight,paper);
                    }else{     
                       
                        var toaddY = ((availableAreaHeight*(colNum-currentCardData.length ))/2);
                        if (((5-currentCardData.length)<=0) || alignitem==false) {
                            toaddY=0;
                        }
                        wrapText(paper,crText,textX,textY+toaddY,availableAreaWidth-((((cardWidth)/colAndRom[0])/(15))*3),(fontSize+(fontSize/5)),fontSize,availableAreaHeight);
                    }
    
                }
                lastIndex = row;    
            }
            }else{
                let degreeNum =((Math.PI*2)/(currentCardData.length));
                console.log(degreeNum);
                let beginAngle= 0;//begin angle
                let endAngle = beginAngle+degreeNum;//end angle
                paper.font = parseInt(fontSize).toString()+"px "+fontName;
                paper.fillStyle = textColor;
                for (let j = 0; j < currentCardData.length; j++) {
                    var labelX = (x+((circleRaduis)) + ((circleRaduis) / 2) * Math.cos(beginAngle + (endAngle- beginAngle)/2));
                    var labelY = (y+((circleRaduis)) + ((circleRaduis) / 2) * Math.sin(beginAngle + (endAngle- beginAngle)/2));

                    if (currentCardData[j].includes("data:image/")) {
                        var image = new Image();
                        image.src = currentCardData[j];
                        
                        imageScalToFit(image,labelX,labelY,circleRaduis,circleRaduis,paper);
                    }else{
                        if (colorize==true) {
                            paper.fillStyle = generateRandomColor();
                        }
                        paper.fillText(currentCardData[j], labelX,labelY);
                    }

		            
                    beginAngle= endAngle;//begin angle
                    endAngle = beginAngle+degreeNum;
                    
                }

                

            }
      
        }
    }
}
function cardCreatorBot(topOrBot) {
    for (let i = 0; i < checkHowManyCardInHeight(cardHeight,paperHeight); i++) {
        for (let k = checkHowManyCardInWidth(cardWidth,paperWidth)-1; k >= 0; k--) {
            if (cardNumber >= howManyCardIncluded) {break;}
            cardNumber++;
            
            var x = ((((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))+cardWidth)*k)+((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))/2;
            var y = ((((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))+cardHeight)*i)+((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))/2;
            paper.beginPath();
            
            paper.lineWidth = cardBorderSize;
            paper.strokeStyle = cardBorderColor;
            paper.fillStyle = cardBackBackgroundColor;
            if (cardModel=="rect") {
                if (isCardRounded) {roundRect(x, y, cardWidth, cardHeight, cardEdgeRound);}
                else{paper.rect(x, y, cardWidth, cardHeight);paper.fill();}
            }else{
                drawCircle(x,y,circleRaduis);paper.fill();
            }
            
            paper.stroke();
            
            let currentCardData = data[0][cardNumber-1];
            if (topOrBot==1) {
                 currentCardData = data[1][cardNumber-1];
            }

            if (cardModel=="rect") {
                let colAndRom = columnAndRowFinder(currentCardData.length);
            
                let lastIndex = 0 ;
                
                for (let col =colAndRom[0] ; col >0 ; col--) {
                     
                    for (var row =0; row < colAndRom[1]; row++) {
                        let crText = currentCardData[lastIndex+ row];
                        if (typeof crText === "undefined") {break;}
                        
                        let textX = (x + (cardWidth/colAndRom[0])*col + (cardWidth/colAndRom[0])/2) -((cardWidth/colAndRom[0]));
                        let textY = (y + (cardHeight/colAndRom[1])*row + (cardHeight/colAndRom[1])/2);
        
                        let availableAreaWidth = cardWidth/colAndRom[0];
                        let availableAreaHeight = cardHeight/colAndRom[1];
                        
                        paper.fillStyle = textColor;
                        paper.textAlign = "center";
        
                        if (crText.includes("data:image/")) {
    
                            if (finalData.mode =="oneSidedPicture") {
                                var image = new Image();
                                image.src = crText;
                                fullBackImage(image,x,y,cardWidth,cardHeight,paper,crText);
                            }else{
                                var image = new Image();
                                image.src = crText;
                                imageScalToFit(image,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/(15))*3),availableAreaHeight,paper);
                            }
                            
                        }else{
                            if (finalData.mode == "oneSidedText") {
                                $(".backfonts").removeAttr("hidden");
                                wrapText(paper,crText,x+(cardWidth/2),y+(cardHeight/2),cardWidth,cardHeight*0.9,(backfontsize+(backfontsize/5)),backfontsize,availableAreaHeight);
                            }else{
                                var toaddY = ((availableAreaHeight*(colNum-currentCardData.length ))/2);
                                if (((5-currentCardData.length)<=0) || alignitem==false) {
                                    toaddY=0;
                                }
                                wrapText(paper,crText,textX,textY+toaddY,availableAreaWidth-(((cardWidth/colAndRom[0])/(colNum*3))*3),(fontSize+(fontSize/5)),fontSize,availableAreaHeight);
                            }
                        }
        
                    }
                    lastIndex = row;    
                }
            }else{
                let degreeNum =((Math.PI*2)/(currentCardData.length));
                console.log(degreeNum);
                let beginAngle= 0;//begin angle
                let endAngle = beginAngle+degreeNum;//end angle
                paper.font = parseInt(fontSize).toString()+"px "+fontName;
                paper.fillStyle = textColor;
                for (let j = 0; j < currentCardData.length; j++) {
                    var labelX = (x+((circleRaduis)) + ((circleRaduis) / 2) * Math.cos(beginAngle + (endAngle- beginAngle)/2));
                    var labelY = (y+((circleRaduis)) + ((circleRaduis) / 2) * Math.sin(beginAngle + (endAngle- beginAngle)/2));

                    if (currentCardData[j].includes("data:image/")) {
                        if (finalData.mode =="oneSidedPicture") {
                            var image = new Image();
                            image.src = currentCardData[j];
                            fullBackImage(image,x,y,circleRaduis*2,circleRaduis*2,paper,currentCardData[j]);
                        }else{
                            var image = new Image();
                            image.src = currentCardData[j];
                            imageScalToFit(image,labelX,labelY,circleRaduis,circleRaduis,paper);
                        }
                        
                    }else{
                        paper.font = parseInt(backfontsize).toString()+"px "+fontName;
                        if (colorize==true) {
                            paper.fillStyle = generateRandomColor();
                        }
                        if (finalData.mode == "oneSidedText") {
                            $(".backfonts").removeAttr("hidden");
                            paper.fillText(currentCardData[j], x+(circleRaduis*2)/2,y+(circleRaduis*2)/2);
                        }else{
                            paper.fillText(currentCardData[j], labelX,labelY);
                        }
                        
                    }

		            
                    beginAngle= endAngle;//begin angle
                    endAngle = beginAngle+degreeNum;
                    
                }

                

            }

            
      
        }
    }
}

let data = finalData.dt;
let howManyCardIncluded = data[0].length;
var cardNumber = 0;
var nameNumber = 1;

paper.font = (cardHeight/30)+"px "+fontName;
paper.fillStyle = textColor;
paper.textAlign = "center";
paper.fillText("صفحه رو - شماره "+nameNumber.toString(), paperWidth/2, paperHeight-(cardHeight/30));

while (cardNumber< howManyCardIncluded) {
    paper.font = (cardHeight/30)+"px "+fontName;
    paper.fillStyle = textColor;
    paper.textAlign = "center";
    paper.fillText("صفحه رو - شماره "+nameNumber.toString(), paperWidth/2, paperHeight-(cardHeight/30));
    cardCreatorTop(0);
    $(".paper").clone().appendTo(".pages");
    $(".paper").first().attr("id","frontPageNumber"+nameNumber.toString()).attr("class","frontPageNumber"+nameNumber.toString());
    nameNumber++;
    paperElement = document.getElementById("paper");
    paper = paperElement.getContext("2d");
    paper.canvas.height = paperHeight;
    paper.canvas.width = paperWidth;
    paper.fillStyle = paperColor;
    paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);
}

howManyCardIncluded = data[1].length;
cardNumber = 0;
nameNumber = 1;

paper.font = (cardHeight/30)+"px "+fontName;
paper.fillStyle = textColor;
paper.textAlign = "center";
paper.fillText("صفحه پشت - شماره "+nameNumber.toString(), paperWidth/2, paperHeight-(cardHeight/30));

while (cardNumber< howManyCardIncluded) {
    paper.font = (cardHeight/30)+"px "+fontName;
    paper.fillStyle = textColor;
    paper.textAlign = "center";
    paper.fillText("صفحه پشت - شماره "+nameNumber.toString(), paperWidth/2, paperHeight-(cardHeight/30));
    cardCreatorBot(1);
    if (cardNumber>= howManyCardIncluded) {break;}
    $(".paper").clone().appendTo(".pages");
    $(".paper").first().attr("id","backPageNumber"+nameNumber.toString()).attr("class","backPageNumber"+nameNumber.toString());
    nameNumber++;
    paperElement = document.getElementById("paper");
    paper = paperElement.getContext("2d");
    paper.canvas.height = paperHeight;
    paper.canvas.width = paperWidth;
    paper.fillStyle = paperColor;
    paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);
}
$(".paper").first().attr("id","backPageNumber"+nameNumber.toString()).attr("class","backPageNumber"+nameNumber.toString());
}

function doit() {
    $(".pages").css("max-height",($(".mainSettings").height())*0.8);
    show(true);
    setTimeout(function () {
        $(".pages").css("max-height",($(".mainSettings").height())*0.8);
    show(true);
    }, 100);
}
function settingInitializer(dd=true) {
    if ($(".paperSizes").val() == "a4") {
        paperWidth = 5953;
        paperHeight = 8419;
    }else if ($(".paperSizes").val() == "a5") {
        paperWidth = 4195;
        paperHeight = 5953;
    }else if ($(".paperSizes").val() == "letter") {
        paperWidth = 6120;
        paperHeight = 7920;
    }else{paperWidth = 5953;paperHeight = 8419;}

    paperColor = $(".paperColor").val();

    if ($(".cardSize").val() == "vert") {
        cardWidth = 1587;
        cardHeight = 2466;
        cardModel="rect";
        $(".bordersizediv").show();
        $(".aligndiv").show();
        $(".colnumdiv").show();
    }else if ($(".cardSize").val() == "horiz") {
        cardWidth = 2466;
        cardHeight = 1587;
        cardModel="rect";
        $(".bordersizediv").show();
        $(".aligndiv").show();
        $(".colnumdiv").show();
    }else if ($(".cardSize").val() == "squ") {
        cardWidth = 2450;
        cardHeight = 2450;
        cardModel="rect";
        $(".bordersizediv").show();
        $(".aligndiv").show();
        $(".colnumdiv").show();
    }else{
        circleRaduis=1100;
        cardModel="circle";
        cardWidth = circleRaduis*2;
        cardHeight = circleRaduis*2;
        $(".bordersizediv").hide();
        $(".aligndiv").hide();
        $(".colnumdiv").hide();
    }


    cardBorderSize = $(".cardBorderSize").val();

    if ($(".cardEsgeRoundSize").val() == "0") {
        isCardRounded = false;
    }else{
        isCardRounded = true;
        cardEdgeRound = parseInt($(".cardEsgeRoundSize").val());
    }

    cardBorderColor = $(".cardBorderColor").val();

    cardBackgroundColor = $(".cardColor").val();

    cardBackBackgroundColor = $(".backcardColor").val();


    textColor = $(".fontColor").val();

    fontSize = $(".fontSize").val();
    backfontsize = $(".backfontSize").val();

    // $(".fontSize").attr({
    //     "max" : mazFontsize     });

    if (dd == true) {
        doit(true);
    }
    
}
function changealign() {
    if (alignitem==true) {
        alignitem = false;
        $(".centeralign").html("غیر فعال").removeClass("btn-success").addClass("btn-danger");
    }else{
        alignitem = true;
        $(".centeralign").html(" فعال").removeClass("btn-danger").addClass("btn-success");
    }
    settingInitializer();
}
function frontExporting() {
    alert("خروجی گرفتن ممکن است کمی طول بکشد ، لطفا صبور باشید ( برای خروجی گرفتن بر روی OK کلیک کنید)");
    settingInitializer(false);
    $(".pages").css("max-height",($(".mainSettings").height())*0.8);
    show(false);
    
    
    var frontPagesArrays = [];
    for (let q = 0; q < 100; q++) {
        if( $(".frontPageNumber"+q).length )
        {
            var canvas = document.getElementById(("frontPageNumber"+q.toString()));
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            frontPagesArrays.push(imgData);
        }
    }
    var pdf = new jsPDF({
        unit: 'pt',
        format: [(paperWidth)*0.75, (paperHeight)*0.75]
    });
    for (let i = 0; i < frontPagesArrays.length; i++) {
    pdf.addImage(frontPagesArrays[i], 'JPEG', 0, 0);   
    pdf.addPage();  
    }
    var pageCount = pdf.internal.getNumberOfPages();
    pdf.deletePage(pageCount);
    pdf.save("خروجی صفحات رو.pdf");
    doit();
    alert("ساخت فایل خروجی به پایان رسید برای دانلود فایل بر روی ok کلیک کنید");
}
function backExporting() {
    alert("خروجی گرفتن ممکن است کمی طول بکشد ، لطفا صبور باشید ( برای خروجی گرفتن بر روی OK کلیک کنید)");
    settingInitializer(false);
    $(".pages").css("max-height",($(".mainSettings").height())*0.8);
    show(false);
    var backPagesArrays = [];
    for (let q = 0; q < 100; q++) {
        if( $(".frontPageNumber"+q).length )
        {
            var canvas = document.getElementById(("backPageNumber"+q.toString()));
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            backPagesArrays.push(imgData);
        }
    }
    var pdf = new jsPDF({
        unit: 'pt',
        format: [(paperWidth)*0.75, (paperHeight)*0.75]
    });
    for (let i = 0; i < backPagesArrays.length; i++) {
    pdf.addImage(backPagesArrays[i], 'JPEG', 0, 0);   
    pdf.addPage();  
    }
    var pageCount = pdf.internal.getNumberOfPages();
    pdf.deletePage(pageCount);
    pdf.save("خروجی صفحات پشت.pdf");
    doit();
    alert("ساخت فایل خروجی به پایان رسید برای دانلود فایل بر روی ok کلیک کنید");
}
function dualExporting() {
    alert("خروجی گرفتن ممکن است کمی طول بکشد ، لطفا صبور باشید ( برای خروجی گرفتن بر روی OK کلیک کنید)");
    settingInitializer(false);
    $(".pages").css("max-height",($(".mainSettings").height())*0.8);
    show(false);
    
    var backPagesArrays = [];
    for (let q = 0; q < 100; q++) {
        if( $(".frontPageNumber"+q).length )
        {
            var canvas = document.getElementById(("backPageNumber"+q.toString()));
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            backPagesArrays.push(imgData);
        }
    }
    var frontPagesArrays = [];
    for (let q = 0; q < 100; q++) {
        if( $(".frontPageNumber"+q).length )
        {
            var canvas = document.getElementById(("frontPageNumber"+q.toString()));
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            frontPagesArrays.push(imgData);
        }
    }

    var pdf = new jsPDF({
        unit: 'pt',
        format: [(paperWidth)*0.75, (paperHeight)*0.75]
    });

    for (let i = 0; i < frontPagesArrays.length; i++) {
    pdf.addImage(frontPagesArrays[i], 'JPEG', 0, 0);   
    pdf.addPage();
    pdf.addImage(backPagesArrays[i], 'JPEG', 0, 0);   
    pdf.addPage();  
    }

    var pageCount = pdf.internal.getNumberOfPages();
    pdf.deletePage(pageCount);
    pdf.save("خروجی صفحات یکی درمیان.pdf");
    doit();
    alert("ساخت فایل خروجی به پایان رسید برای دانلود فایل بر روی ok کلیک کنید");

}

function loadfonts() {
    var stl = document.createElement('style');

    stl.textContent = `
    @font-face {
        font-family: aviny;
        src: url(fonts/selector/aviny-700-fd-wl.ttf);
    }
    @font-face {
        font-family: byekan;
        src: url(fonts/selector/BYekan+.ttf);
    }
    @font-face {
        font-family: Farhood;
        src: url(fonts/selector/Farhood.ttf);
    }
    @font-face {
        font-family: Goldan;
        src: url(fonts/selector/Goldan.ttf);
    }


    @font-face {
        font-family: IranNastaliq;
        src: url(fonts/selector/IranNastaliq.ttf);
    }
   
    @font-face {
        font-family: maghreb;
        src: url(fonts/selector/Maghreb.ttf);
    }
    @font-face {
        font-family:maktab ;
        src: url(fonts/selector/Maktab.ttf);
    }
    @font-face {
        font-family:nafis ;
        src: url(fonts/selector/Nafis.ttf);
    }
    @font-face {
        font-family:nahid ;
        src: url(fonts/selector/Nahid.ttf);
    }
    @font-face {
        font-family:Rightel ;
        src: url(fonts/selector/Rightel.ttf);
    }
    @font-face {
        font-family: sogand;
        src: url(fonts/selector/Sogand.ttf);
    }
    @font-face {
        font-family:tanha ;
        src: url(fonts/selector/Tanha.ttf);
    }
    @font-face {
        font-family:tradbdo ;
        src: url(fonts/selector/tradbdo.ttf);
    }
    @font-face {
        font-family:trado ;
        src: url(fonts/selector/trado.ttf);
    }
    @font-face {
        font-family:vazir ;
        src: url(fonts/selector/Vazir Regular.ttf);
    }
    `;

    document.head.appendChild(stl);
    doit();
    $(".loadfont").hide();
    $(".fontselectordic").removeAttr("hidden");

}
function randomColorizer() {
    
    if (colorize==true) {
        $(".colorizer").removeClass("btn-success").addClass("btn-danger");
        colorize=false;
    }else{
        $(".colorizer").removeClass("btn-danger").addClass("btn-success");
        colorize=true;
    }
    doit();
}

function columnUpdater() {
    colNum = parseInt($(".columnNUmber").val());
    doit();
}





$('select').on('change', function() {
    fontName = this.value;
    $(".fonprev").css("font-family",fontName);
    doit();

  });
settingInitializer(dd=false);

