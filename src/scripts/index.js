function handleThemeToggle(){
    document.body.classList.toggle("light-mode");
}

let themeToggleButton = document.querySelector(".theme-toggle-input");

themeToggleButton.addEventListener("click", handleThemeToggle);

