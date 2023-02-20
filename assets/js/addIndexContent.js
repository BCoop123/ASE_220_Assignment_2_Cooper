//loads data
var mydata = JSON.parse(data);

//loads images
var mypictures = JSON.parse(pictures);

//initilize variables
let numOfCards = 6;
var index = 0;
var name = "N/A";
var id = 0;
var picture;
var type = "N/A";
var back_page = 0;

//gets the starting index for detail.json
if (getAllUrlParams().page >= 2) {
  var i = 0;
  while (i < (getAllUrlParams().page - 1) * 6) {
    if(mydata[index].available.includes("yes")) {
      i++;
    }
    index++;
  }
}
else{
  index = 0;
}
//main loop that adds cards to document
var counter = 0;
while (counter < 6 && mydata[index + 1] ) {
  if(mydata[index].available.includes("yes")) {
    name = mydata[index].name;
    id = mydata[index].id.trim();
    picture = mypictures.image_links[index];
    type = mydata[index].type;
    gender = mydata[index].gender;
    breed = mydata[index].breed;
    age = mydata[index].age;
//creates card template
    var newcard = `
    <div class="col">
      <div class="card shadow-sm">
        <img class="bd-placeholder-img card-img-top" src="${picture}" width="100%" height="225">

        <div class="card-body">
          <p class="card-text">${name}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" onclick="location.href = 'detail.html?page=${getAllUrlParams().page}&id=${id}';" class="btn btn-sm btn-outline-secondary">View</button>
              
            </div>
            <small class="text-muted px-3">${breed} - ${gender} - ${age}</small>
          </div>
        </div>
      </div>
    </div>
    `;
    document.querySelector(".row").innerHTML += newcard;
    counter++;
    console.log(counter);
  }
  index++;
}

//logic for determing the page number of the next page and previous page
var elements = document.getElementsByTagName("footer");
if (getAllUrlParams().page > 1) {
  page = parseInt(getAllUrlParams().page) + 1;
  back_page = parseInt(getAllUrlParams().page) - 1;
}
else {
  var page = 2;
}

//adds the next button to the page
if (mydata.length >= page * 6){
  elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px;">Next</button>`
}

// below is mainly just for the formating of the buttons so that they always exist in one place and dont shift
else{
  elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px; visibility:hidden;">Next</button>`
}

//adds the back button as long as the page is not the first page
if (back_page > 0) {
  elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${back_page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px;">Previous</button>`
}
// again below is mainly just for the formating of the buttons so that they always exist in one place and dont shift
else{
  elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${back_page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px; visibility:hidden;">Previous</button>`
}

