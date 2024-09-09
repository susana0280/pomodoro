let tasks=[]
let timer=null
let time=0
let current=""


badd=document.querySelector("#badd")
itTask=document.querySelector("#itTask")
forn=document.querySelector(".form")

form.addEventListener("submit",e=>{
    e.preventDefault()
   
    if(itTask.value!==null){
        createTask(itTask.value)
        itTask.value=""
        renderTask()
    }
})

function createTask(itTaskValue){
    
    newTask={
        id:(Math.random()*100).toString(36).slice(3),
        title:itTaskValue,
        completed:false
    }

    tasks.push(newTask)

}

function renderTask(){

     const html= tasks.map(task=>{
     
        return `<div class="task">
                  <div class="completed">
                    <div>${task.completed ? `<span class="done">DONE</span>` : `<button class='start-button' data-id="${task.id}">Start</button>` }</div>
                  </div>
                  <div class="title">${task.title}</div>
                    </div>`
     })

    
     document.querySelector("#tasks").innerHTML=html.join("")
     btnsStart=document.querySelectorAll(".start-button")
     btnsStart.forEach(btn=>{
        btn.addEventListener("click",e=>{
           
           if(timer===null){
            let data_id=btn.getAttribute("data-id")
            startHandlerButton(data_id)
              btn.textContent="in progres..."
           }
        })
       
     })
    

    }


    function startHandlerButton(valueDataId){
       time=25*60
        current=valueDataId
        
    taskIndex=tasks.filter(task=>task.id===valueDataId)
    document.querySelector(".taskName").textContent=taskIndex[0].title
   
        timer=setInterval(()=>{
            timeHandler(valueDataId)

        },1000)

    }

    function  timeHandler(id){
     
        time--
       
        renderTime()
        if(time===0){
            clearInterval(timer)
            markCompleted(id)
            timer=null
            renderTask()
            startBreak()
        }
    }

    function renderTime(){
        const timeValue=document.querySelector(".value")
        let minutes=parseInt(time/60)
        let seconds=parseInt(time%60)

        timeValue.textContent=`${minutes<10 ? "0"+minutes :minutes}  : ${seconds<10 ? "0"+seconds : seconds}   `
    
    }


    function markCompleted(id){
       
        taskIndex=tasks.filter(task=>task.id===id)
       taskIndex[0].completed=true
     }

     function startBreak(){
        time=5*60
        document.querySelector(".taskName").textContent="BREAK"
        timeBreak=setInterval(()=>{
            timerBreakHandler();
        },1000)
      

     }

     function timerBreakHandler(){
        time--;
        renderTime()
        if(time===0){
            clearInterval(timeBreak)
            current=null
            timeBreak=null
            document.querySelector(".taskName").textContent=""
            document.querySelector(".done").textContent=""
            renderTasks()
        }
     }