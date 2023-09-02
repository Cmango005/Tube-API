document.getElementById("blog").addEventListener("click",function(){
    window.location.href='blog.html';
});

const handleCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const buttonContainer =document.getElementById("button");
    const buttonData= data.data;
    buttonData.forEach(category => {
        const div= document.createElement("div");
        
        div.innerHTML=`
        <button onclick="handleLoadVideos('${category.category_id}')" class="btn hover:bg-red-600 hover:text-white">${category.category}</button>
        `
        
        buttonContainer.appendChild(div);
        
    });
};

function publishTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}
  
const handleLoadVideos = async(categoryId)=>{
    
    const response= await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const cardContainer =document.getElementById("card-container");
    cardContainer.textContent='';
    const data = await response.json();
    if (categoryId != "1005") {

        data.data.forEach( (videos) =>{
            
        
            const div=document.createElement("div");
            const publishedTime = videos.others.posted_date
            ? publishTime(videos.others.posted_date)
            : "";
            div.innerHTML=`
            <div class="card-body h-72 w-72 mt-4 bg-base-100 shadow-xl">
            <div>
              <figure ><img class="h-28 w-72" src=${videos?.thumbnail}></figure>
             <p class="-mt-5  text-white">${publishedTime}</p>
            </div>
            
            <div class="flex gap-4 mt-3">
               <div>
               <img class="rounded-full w-10 h-10 " src=${videos.authors[0].profile_picture}>
               </div>
               <div>
               <h2 class="card-title">${videos?.title}</h2>
               <p>${videos?.authors[0]?.profile_name}</p>
               <div class="flex mt-2">
               <p>${videos?.others?.views}</p>
               <p>${
                videos?.authors[0]?.verified
                  ? '<img class="w-7 h-7" src="image/verified.png" alt="Verified" class="verified-icon" />': ""}</p>
               </div>

               </div>
            </div>
            
            </div>
            `
            cardContainer.appendChild(div);
         });
     
      } else{
        const cardContainer =document.getElementById("card-container");
        const div=document.createElement("div");
        cardContainer.classList=`flex justify-center`
        
        div.innerHTML=`
        <div class="ml-1/2 mt-8">
        <img class="w-56 h-56" src="image/Icon.png">
        <p class="font-bold text-center">Oops!! Sorry,There is no <br> content here</p>
        </div>
        `
        cardContainer.appendChild(div);

    } 
    
};


handleCategory();
handleLoadVideos(1000);

