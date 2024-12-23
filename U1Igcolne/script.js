var dark = document.getElementById("clicked");
var white = document.getElementById("white-color");
var lol = document.getElementById("white-2color");
dark.onclick = function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        white.style.filter = "brightness(5)";
        lol.style.filter = "brightness(5)";
    } else {
        white.style.filter = "none";
        lol.style.filter = "none";
    }
};

// ===================================
const posts = document.querySelectorAll(".post");
const postsContent = document.querySelectorAll(".post__content");

posts.forEach((post) => {
    if (post.querySelectorAll(".post__media").length > 1) {
        const leftButtonElement = document.createElement("button");
        leftButtonElement.classList.add("post__left-button");
        leftButtonElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="#fff" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
        </svg>
      `;

        const rightButtonElement = document.createElement("button");
        rightButtonElement.classList.add("post__right-button");
        rightButtonElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="#fff" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
        </svg>
      `;

        post.querySelector(".post__content").appendChild(leftButtonElement);
        post.querySelector(".post__content").appendChild(rightButtonElement);

        post.querySelectorAll(".post__media").forEach(function () {
            const postMediaIndicatorElement = document.createElement("div");
            postMediaIndicatorElement.classList.add("post__indicator");

            post.querySelector(".post__indicators").appendChild(
                postMediaIndicatorElement
            );
        });

        // Observer to change the actual media indicator
        const postMediasContainer = post.querySelector(".post__medias");
        const postMediaIndicators = post.querySelectorAll(".post__indicator");
        const postIndicatorObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Removing all the indicators
                        postMediaIndicators.forEach((indicator) =>
                            indicator.classList.remove(
                                "post__indicator--active"
                            )
                        );
                        // Adding the indicator that matches the current post media
                        postMediaIndicators[
                            Array.from(postMedias).indexOf(entry.target)
                        ].classList.add("post__indicator--active");
                    }
                });
            },
            { root: postMediasContainer, threshold: 0.5 }
        );

        // Calling the observer for every post media
        const postMedias = post.querySelectorAll(".post__media");
        postMedias.forEach((media) => {
            postIndicatorObserver.observe(media);
        });
    }
});

// Adding buttons features on every post with multiple medias
postsContent.forEach((post) => {
    if (post.querySelectorAll(".post__media").length > 1) {
        const leftButton = post.querySelector(".post__left-button");
        const rightButton = post.querySelector(".post__right-button");
        const postMediasContainer = post.querySelector(".post__medias");

        // Functions for left and right buttons
        leftButton.addEventListener("click", () => {
            postMediasContainer.scrollLeft -= 400;
        });
        rightButton.addEventListener("click", () => {
            postMediasContainer.scrollLeft += 400;
        });

        // Observer to hide button if necessary
        const postButtonObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach((entry) => {
                    if (
                        entry.target ===
                        post.querySelector(".post__media:first-child")
                    ) {
                        leftButton.style.display = entry.isIntersecting
                            ? "none"
                            : "unset";
                    } else if (
                        entry.target ===
                        post.querySelector(".post__media:last-child")
                    ) {
                        rightButton.style.display = entry.isIntersecting
                            ? "none"
                            : "unset";
                    }
                });
            },
            { root: postMediasContainer, threshold: 0.5 }
        );

        if (window.matchMedia("(min-width: 1024px)").matches) {
            postButtonObserver.observe(
                post.querySelector(".post__media:first-child")
            );
            postButtonObserver.observe(
                post.querySelector(".post__media:last-child")
            );
        }
    }
});


// -----------------------------------

// Suggestion SCROLL BUTTONS

const suggestionsContainer = document.querySelector('.suggestions');
const suggestionLeftButton = document.querySelector('.suggestion__left-button');
const suggestionRightButton = document.querySelector('.suggestion__right-button');

if (suggestionLeftButton && suggestionRightButton && suggestionsContainer) {
    suggestionLeftButton.addEventListener('click', () => {
        suggestionsContainer.scrollLeft -= 320;
    });

    suggestionRightButton.addEventListener('click', () => {
        suggestionsContainer.scrollLeft += 320;
    });

    // Hide buttons appropriately
    const suggestionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach((entry) => {
                if (entry.target === suggestionsContainer.firstElementChild) {
                    suggestionLeftButton.style.display = entry.isIntersecting ? 'none' : 'block';
                }
                if (entry.target === suggestionsContainer.lastElementChild) {
                    suggestionRightButton.style.display = entry.isIntersecting ? 'none' : 'block';
                }
            });
        },
        { root: suggestionsContainer, threshold: 1 }
    );

    if (suggestionsContainer.firstElementChild) {
        suggestionObserver.observe(suggestionsContainer.firstElementChild);
    }
    if (suggestionsContainer.lastElementChild) {
        suggestionObserver.observe(suggestionsContainer.lastElementChild);
    }
}