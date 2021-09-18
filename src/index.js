const songs = [
  {
    songName: "Another Part of Me",
    albumTitle: "Bad",
    youTubeLink: "https://youtu.be/8vwHQNQ88cM",
    playCount: 28926161,
    releaseYear: 1988
  },

  {
    songName: "Who is it",
    albumTitle: "Dangerous",
    youTubeLink: "https://www.youtube.com/watch?v=PfrV_6yWbEg",
    playCount: 74873528,
    releaseYear: 1991
  },

  {
    songName: "Break of Dawn",
    albumTitle: "Invincible",
    youTubeLink: "https://youtu.be/O8ELJ_Eh8A0",
    playCount: 2720954,
    releaseYear: 2001
  },

  {
    songName: "Chicago",
    albumTitle: "Xscape",
    youTubeLink: "https://youtu.be/Y_8mUx4VOmo",
    playCount: 2247248,
    releaseYear: 2014
  },

  {
    songName: "Off the Wall",
    albumTitle: "Off the Wall",
    youTubeLink: "https://youtu.be/_BfcRjZn6y4",
    playCount: 5075346,
    releaseYear: 1979
  }
];
const mainDiv = document.querySelector(".flex-container");

const songNameInput = document.getElementById("songNameInput");

const albumTitleInput = document.getElementById("albumTitleInput");

const releaseYearInput = document.getElementById("releaseYearInput");

const youTubeLinkInput = document.getElementById("youTubeLinkInput");

const playCountInput = document.getElementById("playCountInput");

const createButton = document.getElementById("addSong");

const updateButton = document.getElementById("updateSong");
let updateSongIndexArray;
function renderData() {
  mainDiv.innerHTML = "";

  for (let songIndex = 0; songIndex < songs.length; songIndex++) {
    const songListItem = document.createElement("div");

    songListItem.className = "song-card";

    songListItem.innerHTML = `
      <h2>${songs[songIndex].songName}</h2>
      <p>Album Title: ${songs[songIndex].albumTitle}</p>
      <p>Release Year: ${songs[songIndex].releaseYear}</p>
      <p>Play Count: ${songs[songIndex].playCount}</p>
      <a href="${songs[songIndex].youTubeLink}" target="_blank">YouTube</a>
      <br>
      <button class="deleteButton--${songIndex}">Delete</button>
      <button class="updateButton--${songIndex}">Update</button>
    `;
    mainDiv.append(songListItem);
  }
  const deleteButtons = document.querySelectorAll('[class^="deleteButton--"]');
  console.log(deleteButtons);

  for (let btn of deleteButtons) {
    btn.addEventListener("click", function () {
      var buttonIndexArray = btn.className.split("deleteButton--");
      console.log(buttonIndexArray);
      songs.splice(buttonIndexArray[1], 1);
      renderData();
    });
  }
  function createData() {
    const songName = songNameInput.value;
    console.log("songName", songName);
    const albumTitle = albumTitleInput.value;
    console.log("albumTitle", albumTitle);
    const releaseYear = releaseYearInput.value;
    console.log("releaseYear", releaseYear);
    const youTubeLink = youTubeLinkInput.value;
    console.log("youTubeLink", youTubeLink);
    const playCount = playCountInput.value;
    console.log("playCount", playCount);

    const newSong = {
      songName,
      albumTitle,
      playCount,
      youTubeLink,
      releaseYear
    };
    console.log("newsong", newSong);
    songs.push(newSong);

    songNameInput.value = "";
    albumTitleInput.value = "";
    releaseYearInput.value = "";
    youTubeLinkInput.value = "";
    playCountInput.value = "";

    renderData();
    createButton.removeEventListener("click", createData);
  }
  createButton.addEventListener("click", createData);
}

renderData();
//update part A
const updateButtons = document.querySelectorAll('[class^="updateButton--"');
for (let btn of updateButtons) {
  btn.addEventListener("click", () => {
    //get the index number from the class
    updateSongIndexArray = btn.className.split("updateButton--");
    console.log(updateSongIndexArray);
    //get the song item from the array and set it to a variable
    var updateSongInfo = songs[updateSongIndexArray[1]];
    console.log(updateSongInfo);
    //setting the value property of the input to the object key
    songNameInput.value = updateSongInfo.songName;
    albumTitleInput.value = updateSongInfo.albumTitle;
    playCountInput.value = updateSongInfo.playCount;
    youTubeLinkInput.value = updateSongInfo.youTubeLink;
    releaseYearInput.value = updateSongInfo.releaseYear;
    //hide submit button and show update submit button
    createButton.classList.add("hidden");
    updateButton.classList.remove("hidden");
  });
}
//create function for updating the song array
function updateSong() {
  var updatedSong = {
    songName: songNameInput.value,
    albumTitle: albumTitleInput.value,
    playCount: playCountInput.value,
    youTubeLink: youTubeLinkInput.value,
    releaseYear: releaseYearInput.value
    //construct the remain keys for this object
  };
  //remove element and insert new updatedSong into songs array
  songs.splice(updateSongIndexArray[1], 1, updatedSong);
  //switch buttons back
  updateButton.classList.add("hidden");
  createButton.classList.remove("hidden");
  //clear out the input forms
  songNameInput.value = "";
  albumTitleInput.value = "";
  releaseYearInput.value = "";
  playCountInput.value = "";
  youTubeLinkInput.value = "";
  //re-render the updated data
  renderData();
}
updateButton.addEventListener("click", updateSong);
