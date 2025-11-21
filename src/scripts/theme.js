function handleThemeToggle(){
    document.documentElement.classList.toggle("light-mode"); // if loaded before body we need to add class to html element

    if(document.documentElement.classList.contains("light-mode")){
        localStorage.setItem("theme", "light");
    }
    else{
        localStorage.setItem("theme", "dark");
    }

}

window.addEventListener("pageshow", (e) => { // page show work always, including arrow navigation (DOMContentLoader did not)
    let themeToggleButton = document.querySelector(".theme-toggle-input");

    themeToggleButton.addEventListener("click", handleThemeToggle);
    let theme = localStorage.getItem("theme");

    if(theme === "light"){
        themeToggleButton.checked = false;
    }
    else{
        themeToggleButton.checked = true;
    }
})


