
let darkMode = localStorage.getItem('darkMode');
const darkmode = document.querySelector('.navbar-darkmoon');
const form = document.getElementById('form');
const wordput = document.getElementById('wordput');
const phoneticText = document.querySelector('.phonetictext');
const word = document.querySelector('.mapping');
const meaningDiv = document.querySelector('.content ')
const audioBtn = document.getElementById('audiobtn');
const error = document.getElementById('error');
const audio = document.getElementById('audio');
const errorLabel = document.getElementById('erroLabel');
// errorLabel.style.display = "block"
// console.log(darkMode)



// console.log(meaningDiv)


form.addEventListener('submit', (e) => {
    e.preventDefault()

   
  if(wordput.value.length <= 1) {
    erroLabel.style.display = 'block'
    return
  } else {
    erroLabel.style.display = 'none'
  }

    let data = fetWord(wordput.value)
    if(data === false){
      return true
    }  
})




function fetWord(word) {
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
  .then((res) => res.json())
  .then((data) => {
    result(data)
  }) 
  // .catch (() => {
  //   data.innerHTML = `
    
  //   <div class="error" id="error">
  //     <p class="erro1"> Oops, Sorry pal, we couldn't find definitions  </p>
  //     <p class="erro1">for the word you were looking for.</p>
  //     <p class="erro2">404</p>
  //     <p class="erro3" >no be juju be that</p>
  //     <button class="erro4"> <a href="index.html">Take me home</a> </button>
  //  </div> 

  //   `
  // })

} 



function playAudio() {
  audio.play()
}


// result

function  result(data) {
  console.log(data)




  let getphoneticText = data[0]?.phonetics.find((item) => {
    if(item.text?.length > 0) return true;
  })


  let getphoneticAudio = data[0]?.phonetics.find((item) => {
    if (item.audio?.length > 0) return true;
  })

  if(getphoneticAudio !=undefined){
   audio.setAttribute('src', getphoneticAudio?.audio)
    audioBtn.style.display = "block"
  }
  else{
    audioBtn.style.display = "none"
  }


  word.textContent = wordput.value
  phoneticText.textContent = getphoneticText?.text

  let meaningString = " ";
  data[0]?.meanings.map( item => {
    meaningString = meaningHTML(item)
  })

  meaningDiv.innerHTML =  meaningString

  let tableData = '';
  
  data[0]?.meanings.map(function(value) {
    tableData += meaningHTML(value)
  })
  meaningDiv.innerHTML = tableData;
}


function meaningHTML(meaning) {
  let others = ' '
  meaning.definitions?.map((item, index) => (others += othersHtml(item, index)))
  let html = `
  
  <div  class="span-b">
    <ul>
          <p>${meaning.partOfSpeech}</p>
          <ul>${others}</ul>
      </ul>
    </div> `
   
    html = html.trim()
    return html

}


  // definitions

function othersHtml(definition, index){
  definitionHtml = `
  
  <ul>
     <li class="gaps">${index + 1}.  ${definition?.definition}</li>
     </ul> `

      let exampleHtml = ''
      let synonymsHtml = ''
  
      

  
      if(definition.example != undefined){
        exampleHtml += `
        <ul >
            <h4 > sentence: “${definition?.example}" </h4>
        </ul>`
      }

      if(definition.synonyms != undefined && definition.synonyms.length > 0) {
        synonymsHtml += `
        
        <p> Synonyms: “ ${flatArray(definition?.synonyms)}”</p>
        
        
        `
        
      }

    

       definitionHtml +=  exampleHtml + synonymsHtml +     " </ul></li>"
      return definitionHtml

}


//  function flatArray(arr) {
//    return arr.reduce((pv,cv) => {
//      return pv + ',' + cv
//    })
//  }


  //   body darkmode
 
const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
};


const disableDarkMode = () => {
  
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', 'null');
};


if (darkMode === "enabled") {
  enableDarkMode()
}


darkmode.addEventListener('click', () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
   enableDarkMode();
  //  console.log(darkMode)
  } else {
    disableDarkMode()
    // console.log(darkMode)
  }
});