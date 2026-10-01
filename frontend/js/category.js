function selectCategory(category) {

    console.log("Selected Category:", category);

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href =
        "questions.html";
}