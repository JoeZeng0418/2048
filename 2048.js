$(function(){

  var score = 0;
  var nums = new Array();
  //set up the background cell
  for (var i = 0; i < 4; i++) {
    nums[i] = new Array();
    for (var j = 0; j < 4; j++) {
      $(".game").append('<div class="cell" id="cell_'+i+j+'"></div>');
      $("#cell_"+i+j).css({
        top: 20*(i+1)+100*i,
        left: 20*(j+1)+100*j,
      });
      nums[i][j] = 0;
      $('.game').append('<div class="num" id="num_'+i+j+'"></div>');
    }
  }


  updateNums();
  createNum();
  createNum();
  //update number cell
  function updateNums(){
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {

        $eachNum = $('#num_'+i+j);
        if (nums[i][j] ==0) {
          $eachNum.css({
            width:'0px',
            height:'0px',
            opacity:'0',
            top:20*(i+1)+100*i+45,
            left:20*(j+1)+100*j+45,
          });
          // console.log("0");
        } else {
          if (nums[i][j]>100&&nums[i][j]<1000) {
            $eachNum.css({
              fontSize:'55px',
            });
          } else if (nums[i][j]>=1000) {
            $eachNum.css({
              fontSize:'42px',
            });
          }
          $eachNum.css({
            width:'100px',
            height:'100px',
            opacity:1,//not necessary
            top:20*(i+1)+100*i,
            left:20*(j+1)+100*j,
            color:getColor(nums[i][j]),
            backgroundColor:getBGColor(nums[i][j]),
          });
          $eachNum.text(nums[i][j]);
          // console.log("0");
        }
      }
    }
  }
  // function to get cell's background color
  function getBGColor(num){
    switch (num) {
      case 2:return "#eee4da";break;
      case 4:return "#ede0c8";break;
      case 8:return "#f2b179";break;
      case 16:return "#f59563";break;
      case 32:return "#f67c5f";break;
      case 64:return "#f65e3b";break;
      case 128:return "#edcf72";break;
      case 256:return "#edcc61";break;
      case 512:return "#9c0";break;
      case 1024:return "#33b5e5";break;
      case 2048:return "#09c";break;
      case 4096:return "#a6c";break;
      case 8192:return "#93c";break;
    }
  }

  // function to get the color of the text
  function getColor(num){
    if (num>4) {
      return "white";
    } else {
      return "#776e65";
    }
  }



  $("#start_button").click(function(){
    restart();
    // updateNums();

  });
  // create a new number
  function createNum(){
    var posX = Math.floor(Math.random()*4);
    var posY = Math.floor(Math.random()*4);
    var value;
    if (Math.random()<0.5) {
      value = 2;
    } else {
      value = 4;
    }
    while (nums[posX][posY]!=0) {
      posX = Math.floor(Math.random()*4);
      posY = Math.floor(Math.random()*4);
    }
    nums[posX][posY] = value;
    score += value;
    $('#score').text(score);
    showNum(posX,posY,value);
    checkGameOver();
  }

  // show the new number with animation
  function showNum(posX, posY,value){
    $("#num_"+posX+posY).css({
      backgroundColor:getBGColor(value),
      color:getColor(value),
    }).text(value).animate({
      // position:'absolute',
      width:"100px",
      height:"100px",
      opacity:1.0,
      top:20*(posX+1)+100*posX,
      left:20*(posY+1)+100*posY,
    },80);
    // console.log(posX+' '+posY+' '+value);
  }

  //keycode detection (which direction)
  $(document).keydown(function(key){
    switch (key.keyCode) {
      case 37://left
        if (canMoveLeft()) {
          console.log("left");
          moveLeft();
          // after the animation of movig is complete, create a new num
          setTimeout(function(){
            createNum();
          },200);
        }
        break;
      case 38://up
        if (canMoveUp()) {
          moveUp();
          setTimeout(function(){
            createNum();
          },200);
        }
        break;
      case 39://right
        if (canMoveRight()) {
          moveRight();
          setTimeout(function(){
            createNum();
          },200);
        }
        break;
      case 40://down
        if (canMoveDown()) {
          moveDown();
          setTimeout(function(){
            createNum();
          },200);
        }
        break;
      default:
        break;
    }
  });

  function checkGameOver(){
    if (!canMoveLeft()&&!canMoveDown()&&!canMoveRight()&&!canMoveUp()) {
      alert("Game over. Your final score is "+score);
      restart();
    }
  }

  function restart(){
    score = 0;
    nums = new Array();
    //set up the background cell
    for (var i = 0; i < 4; i++) {
      nums[i] = new Array();
      for (var j = 0; j < 4; j++) {
        nums[i][j] = 0;
        // $('.game').append('<div class="num" id="num_'+i+j+'"></div>');
      }
    }

    updateNums();
    createNum();
    createNum();
  }

  function canMoveLeft(){
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if (nums[i][j]!=0) {
          if (nums[i][j]==nums[i][j-1]||nums[i][j-1]==0) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function canMoveRight(){
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (nums[i][j]!=0) {
          if (nums[i][j]==nums[i][j+1]||nums[i][j+1]==0) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function canMoveUp(){
    for (var i = 1; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (nums[i][j]!=0) {
          if (nums[i][j]==nums[i-1][j]||nums[i-1][j]==0) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function canMoveDown(){
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (nums[i][j]!=0) {
          if (nums[i+1][j]==nums[i][j]||nums[i+1][j]==0) {
            return true;
          }
        }
      }
    }
    return false;
  }


  function moveLeft(){
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if (nums[i][j]!=0) {
          for (var k = 0; k < j; k++) {
            //if the left is space
            if (nums[i][k]==0 && hasAllSpaceOnLeft(i,j,k)) {
              // move(i,j,i,k);
              nums[i][k] = nums[i][j];
              nums[i][j] = 0;
            } else if (nums[i][j]==nums[i][k] && hasAllSpaceOnLeft(i,j,k)) {
              // move(i,j,i,k);
              nums[i][k] += nums[i][j];
              nums[i][j] = 0;
            }
          }
        }
      }
    }
    setTimeout(function(){
      updateNums();
    },200);
  }
  function hasAllSpaceOnLeft(i,j,k){
    for (var m = k+1; m < j; m++) {
      if (nums[i][m]!=0) {
        return false;
      }
    }
    return true;
  }


  function moveRight(){
    for (var i = 0; i < 4 ; i++) {
      for (var j = 2; j >= 0; j--) {
        if (nums[i][j]!=0) {
          for (var k = 3; k > j; k--) {
            //if the right is space
            if (nums[i][k]==0 && hasAllSpaceOnRight(i,j,k)) {
              // move(i,j,i,k);
              nums[i][k] = nums[i][j];
              nums[i][j] = 0;
            } else if (nums[i][j]==nums[i][k] && hasAllSpaceOnRight(i,j,k)) {
              // move(i,j,i,k);
              nums[i][k] += nums[i][j];
              nums[i][j] = 0;
            }
          }
        }
      }
    }
    setTimeout(function(){
      updateNums();
    },200);
  }
  function hasAllSpaceOnRight(i,j,k){
    for (var m = k-1; m > j; m--) {
      if (nums[i][m]!=0) {
        return false;
      }
    }
    return true;
  }

  function moveUp(){
    for (var i = 0; i < 4 ; i++) {
      for (var j = 1; j < 4; j++) {
        if (nums[j][i]!=0) {
          for (var k = 0; k < j; k++) {
            //if the top is space
            if (nums[k][i]==0 && hasAllSpaceOnTop(i,j,k)) {
              // move(i,j,i,k);
              nums[k][i] = nums[j][i];
              nums[j][i] = 0;
            } else if (nums[j][i]==nums[k][i] && hasAllSpaceOnTop(i,j,k)) {
              // move(i,j,i,k);
              nums[k][i] += nums[j][i];
              nums[j][i] = 0;
            }
          }
        }
      }
    }
    setTimeout(function(){
      updateNums();
    },200);
  }
  function hasAllSpaceOnTop(i,j,k){
    for (var m = k+1; m < j; m++) {
      if (nums[m][i]!=0) {
        return false;
      }
    }
    return true;
  }


  function moveDown(){
    for (var i = 0; i < 4 ; i++) {
      for (var j = 2; j >= 0; j--) {
        if (nums[j][i]!=0) {
          for (var k = 3; k > j; k--) {
            //if the top is space
            if (nums[k][i]==0 && hasAllSpaceOnBottom(i,j,k)) {
              // move(i,j,i,k);
              nums[k][i] = nums[j][i];
              nums[j][i] = 0;
            } else if (nums[j][i]==nums[k][i] && hasAllSpaceOnBottom(i,j,k)) {
              // move(i,j,i,k);
              nums[k][i] += nums[j][i];
              nums[j][i] = 0;
            }
          }
        }
      }
    }
    setTimeout(function(){
      updateNums();
    },200);
  }
  function hasAllSpaceOnBottom(i,j,k){
    for (var m = k-1; m > j; m--) {
      if (nums[m][i]!=0) {
        return false;
      }
    }
    return true;
  }






});
