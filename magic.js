console.log('Welcome to magic note app !!');
showNotes();

// Adding Notes
document.getElementById('addBtn').addEventListener('click', function (e) 
{
    let addnote = document.getElementById('addNote');
    let addtitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null)
        notesobj = [];
    else 
        notesobj = JSON.parse(notes);       // notesobj is now array of objects
    
    let myobj={
        title:addtitle.value,
        text: addnote.value
    }
    notesobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addnote.value = "";
    addtitle.value= "";
    console.log(notesobj);
    showNotes();
});

//Show Notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    let html ="";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="noteCard  mx-5 my-5" id='notesdiv' style="width: 18rem; text-align: center; border-style: solid;  padding : 0ch;">
            <div class="card-header" style = "background-color: black; color: white;" >
                <b> Note ${index+1} : ${element.title}</b>
            </div >
            <div class="card-body" style="margin: 5% ;">
                <textarea class="card-text" style = "width:100%; min-height:150px;" >${element.text}</textarea>
                <hr>
                <button id="${index}" onclick="deletenote(${index})" class="btn btn-primary">Delete Note</button>
            </div>
        </div >`;
    });
    let notelem=document.getElementById('notesdiv');
    if(notesobj.length !=0){
        notelem.innerHTML= html;
    }
    else
       notelem.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`;
}

// Deleting note
function deletenote(index){
    let notes=localStorage.getItem("notes");
    if(notes==null)
        notesobj=[];
    else
        notesobj=JSON.parse(notes);
    notesobj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesobj));
    showNotes();
}

// Searching key
let search=document.getElementById('search');
search.addEventListener('input',function(e)
{
    //let inputval = search.value.toLowerCase();
    let inputval = search.value;
    let notecards=document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element)
    {
        let cardtxt=element.getElementsByTagName('textarea')[0].innerHTML;
        if(cardtxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
});
