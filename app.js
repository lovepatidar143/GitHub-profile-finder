let form = document.querySelector(".search-form");
let btn = document.querySelector("button");
let input = document.querySelector("#username");

let name = document.querySelector(".name");
let bio = document.querySelector(".bio");
let repo = document.querySelector(".repo");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let id = document.querySelector(".id");

function showLoder(){
    document.querySelector(".loader").classList.remove("hidden");
}
function hideLoder(){
    document.querySelector(".loader").classList.add("hidden");
}



async function collect_data() {
    try{
        showLoder();
        let url = "https://api.github.com/users/";
        const formData = new FormData(form);
        const username = formData.get('username').trim();
        // 
        // console.log(username);
        const response = await fetch(url+username);
        const dataOfUser = await response.json();
        if(!response.ok){
            throw new Error("User not found");
        }
        // console.log(dataOfUser);
        hideLoder();
        return dataOfUser;

    }catch(err){
        hideLoder();
        // console.log(err);

        return err;
    }
    
}


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    console.log("form submited");
    collect_data()
    .then((resolve) =>{
        console.log(resolve);// resolve is the final obj
        input.value = "";
        document.querySelector(".user-profile").classList.remove("hidden");
        document.querySelector(".user-photo").setAttribute("src",resolve.avatar_url);
        name.innerText = `Name  :  ${resolve.name || resolve.login}`;
        bio.innerText = `Bio  :  ${resolve.bio || "No Bio Available"}`;
        followers.innerText = `Followers. : ${resolve.followers}`;
        following.innerText = `Followings  : ${resolve.following}`;
        id.innerText = `ID  : ${resolve.id}`;
        repo.innerText = `Public repos. : ${resolve.public_repos}`;






    })
    .catch((reject)=>{
        document.querySelector(".user-profile").classList.add("hidden");
        document.querySelector(".error-message").classList.remove("hidden");
        console.log(reject);

    });
});
