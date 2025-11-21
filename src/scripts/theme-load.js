// files separated to disable Flash of Unstyled Content (flashing when refreshing)

let theme = localStorage.getItem("theme");

if(theme === "light"){
    document.documentElement.classList.add("light-mode"); // if loaded before body we need to add class to html element
}