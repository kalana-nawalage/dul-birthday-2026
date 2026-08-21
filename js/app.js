function showScene(sceneId) {

    const scenes =
        document.querySelectorAll(".scene");

    scenes.forEach((scene) => {

        scene.classList.remove(
            "active",
            "scene-enter",
            "scene-exit"
        );

    });


    const nextScene =
        document.getElementById(sceneId);


    if (nextScene) {

        nextScene.classList.add("active");

    }

}

function unlockBirthday() {
    const countdownScene = document.getElementById("countdown");

    if (!countdownScene) return;

    countdownScene.classList.add("scene-exit");

    setTimeout(() => {
        showScene("welcome");

        if (musicToggle) {
    musicToggle.classList.add("visible");
         }

        const welcomeScene = document.getElementById("welcome");

        if (welcomeScene) {
            welcomeScene.classList.add("scene-enter");
        }
    }, 900);
}

const heartContainer = document.getElementById("heart-particles");

function createFloatingHeart() {
    if (!heartContainer) return;

    const heart = document.createElement("span");

    heart.classList.add("floating-heart");
    heart.textContent = "♥";

    const size = Math.random() * 12 + 8;
    const position = Math.random() * 100;
    const duration = Math.random() * 4 + 6;
    const drift = Math.random() * 80 - 40;

    heart.style.left = `${position}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty("--drift", `${drift}px`);

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createFloatingHeart, 900);

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "u") {
        unlockBirthday();
    }
});

const followMisuuButton = document.getElementById("follow-misuu");

if (followMisuuButton) {
    followMisuuButton.addEventListener("click", () => {
        playBirthdayMusic();
        showScene("birthday");

        const birthdayScene = document.getElementById("birthday");

        if (birthdayScene) {
            birthdayScene.classList.add("scene-enter");
        }
    });
}

// =====================================================
// PAGE 2 → PAGE 3
// =====================================================

const startStoryButton = document.getElementById("start-story");

if (startStoryButton) {
    startStoryButton.addEventListener("click", () => {

        showScene("photos");

        const photosScene = document.getElementById("photos");

        if (photosScene) {
            photosScene.classList.add("scene-enter");
        }

    });
}

// =====================================================
// PAGE 3 — PHOTO VIEWER
// =====================================================

const polaroids = document.querySelectorAll(".polaroid");

const photoViewer = document.getElementById("photo-viewer");

const viewerImage = document.getElementById("viewer-image");

const closePhotoButton = document.getElementById("close-photo");


polaroids.forEach((photo) => {

    photo.addEventListener("click", () => {

        const photoSource = photo.dataset.photo;

        viewerImage.src = photoSource;

        photoViewer.classList.add("open");


        // Hide music button while photo is open
        if (musicToggle) {
            musicToggle.classList.add("hidden-during-photo");
        }

    });

});


// =====================================================
// CLOSE PHOTO VIEWER
// =====================================================

function closePhotoViewer() {

    photoViewer.classList.remove("open");


    // Show music button again
    if (musicToggle) {
        musicToggle.classList.remove("hidden-during-photo");
    }

}


if (closePhotoButton) {

    closePhotoButton.addEventListener(
        "click",
        closePhotoViewer
    );

}


if (photoViewer) {

    photoViewer.addEventListener("click", (event) => {

        if (event.target === photoViewer) {

            closePhotoViewer();

        }

    });

}

// =====================================================
// PAGE 3 → PAGE 4
// =====================================================

const photosNextButton = document.getElementById("photos-next");

if (photosNextButton) {
    photosNextButton.addEventListener("click", () => {

        showScene("reasons");

        const reasonsScene = document.getElementById("reasons");

        if (reasonsScene) {
            reasonsScene.classList.add("scene-enter");
        }

    });
}

// =====================================================
// PAGE 4 — REASON CARDS
// =====================================================

const reasonCards = document.querySelectorAll(".reason-card");

const reasonsOpened = document.getElementById("reasons-opened");

let openedReasons = 0;


reasonCards.forEach((card) => {

    card.addEventListener("click", () => {

        if (card.classList.contains("revealed")) {
            return;
        }

        const reason = card.dataset.reason;

        const reasonText = card.querySelector(".reason-text");

        reasonText.textContent = reason;

        card.classList.add("revealed");

        openedReasons++;

        if (reasonsOpened) {
            reasonsOpened.textContent = openedReasons;
        }

        const reasonsNextButton = document.getElementById("reasons-next");

if (openedReasons === 6 && reasonsNextButton) {

    reasonsNextButton.disabled = false;
    reasonsNextButton.classList.remove("locked");

    reasonsNextButton.innerHTML = `
        <span class="reasons-button-text">Keep going</span>
        <span>→</span>
    `;

}

    });

});

// =====================================================
// PAGE 4 → PAGE 5
// =====================================================

const reasonsNextButton = document.getElementById("reasons-next");

if (reasonsNextButton) {
    reasonsNextButton.addEventListener("click", () => {

        showScene("letter");

        const letterScene = document.getElementById("letter");

        if (letterScene) {
            letterScene.classList.add("scene-enter");
        }

    });
}

if (reasonsNextButton) {
    reasonsNextButton.addEventListener("click", () => {

        showScene("letter");

        const letterScene = document.getElementById("letter");

        if (letterScene) {
            letterScene.classList.add("scene-enter");
        }

    });
}

// =====================================================
// PAGE 5 — LOVE LETTER
// =====================================================

const openLetterButton = document.getElementById("open-letter");
const letterNextButton = document.getElementById("letter-next");
const letterHint = document.getElementById("letter-hint");


if (openLetterButton) {

    openLetterButton.addEventListener("click", () => {

        if (openLetterButton.classList.contains("open")) {
            return;
        }

        openLetterButton.classList.add("open");

       if (letterHint) {
    letterHint.classList.add("hidden");
       }

        setTimeout(() => {

            if (letterNextButton) {
                letterNextButton.disabled = false;
                letterNextButton.classList.add("unlocked");
            }

        }, 1100);

    });

}

// =====================================================
// PAGE 5 → PAGE 6
// =====================================================

if (letterNextButton) {

    letterNextButton.addEventListener("click", () => {

        showScene("game");

        const gameScene = document.getElementById("game");

        if (gameScene) {
            gameScene.classList.add("scene-enter");
        }

        startMisuuGame();

    });

}

// =====================================================
// PAGE 6 → PAGE 7
// =====================================================

const gameToSurpriseButton =
    document.getElementById("game-next");

if (gameToSurpriseButton) {

    gameToSurpriseButton.addEventListener("click", () => {

        showScene("surprise");

        const surpriseScene =
            document.getElementById("surprise");

        if (surpriseScene) {
            surpriseScene.classList.add("scene-enter");
        }

    });

}

// =====================================================
// PAGE 7 — FINAL SURPRISE
// =====================================================

const openGiftButton =
    document.getElementById("open-gift");

const giftStage =
    document.getElementById("gift-stage");

const videoStage =
    document.getElementById("video-stage");

const birthdayVideo =
    document.getElementById("birthday-video");

const finalMessage =
    document.getElementById("final-message");

const surpriseNextButton =
    document.getElementById("surprise-next");

let resumeMusicAfterVideo = false;


if (openGiftButton) {

    openGiftButton.addEventListener("click", () => {

        openGiftButton.classList.add("opening");

        createSurpriseBurst();


        setTimeout(() => {

            if (giftStage) {
                giftStage.style.display = "none";
            }


            if (videoStage) {
                videoStage.classList.add("show");
            }


            if (birthdayVideo) {

             birthdayVideo.currentTime = 0;

             // Remember whether music was playing
             resumeMusicAfterVideo = musicPlaying;

             // Pause background music during the birthday video
             if (musicPlaying) {
             pauseBirthdayMusic();
            }

             birthdayVideo
             .play()
             .catch(() => {

                 birthdayVideo.controls = true;

             });

    }

        }, 700);

    });

}

if (birthdayVideo) {

    birthdayVideo.addEventListener("ended", () => {

        // Resume background music only if it was
        // playing before the video started
        if (resumeMusicAfterVideo) {
            playBirthdayMusic();
        }

        resumeMusicAfterVideo = false;


        if (finalMessage) {
            finalMessage.classList.add("show");
        }


        if (surpriseNextButton) {

            surpriseNextButton.disabled = false;

            surpriseNextButton.classList.add("unlocked");

        }


        createSurpriseBurst();

    });

}

function createSurpriseBurst() {

    const container =
        document.getElementById("surprise-particles");

    if (!container) {
        return;
    }


    for (let i = 0; i < 18; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("surprise-particle");


        particle.textContent =
            Math.random() > 0.45
                ? "♥"
                : "✦";


        particle.style.left =
            `${40 + Math.random() * 20}%`;

        particle.style.top =
            `${42 + Math.random() * 16}%`;


        particle.style.setProperty(
            "--x",
            `${Math.random() * 240 - 120}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.random() * -180 - 30}px`
        );


        container.appendChild(particle);


        setTimeout(() => {
            particle.remove();
        }, 1400);

    }

}

// =====================================================
// PAGE 7 → PAGE 8
// =====================================================

if (surpriseNextButton) {

    surpriseNextButton.addEventListener("click", () => {

        showScene("ending");

        const endingScene =
            document.getElementById("ending");

        if (endingScene) {

            endingScene.classList.add("scene-enter");

        }

    });

}

// =====================================================
// PAGE 8 — REPLAY EXPERIENCE
// =====================================================

const replayBirthdayButton =
    document.getElementById("replay-birthday");


if (replayBirthdayButton) {

    replayBirthdayButton.addEventListener("click", () => {

        resetBirthdayExperience();

        showScene("welcome");


        const welcomeScene =
            document.getElementById("welcome");


        if (welcomeScene) {

            welcomeScene.classList.add(
                "scene-enter"
            );

        }

    });

}

// =====================================================
// TEMPORARY TEST MODE
// =====================================================

const params = new URLSearchParams(window.location.search);

if (params.get("test") === "1") {
    unlockBirthday();
}

// =====================================================
// GLOBAL BACKGROUND MUSIC
// =====================================================

const backgroundMusic =
    document.getElementById("background-music");

const musicToggle =
    document.getElementById("music-toggle");

const musicIcon =
    document.getElementById("music-icon");

let musicPlaying = false;


if (backgroundMusic) {
    backgroundMusic.volume = 0.35;
}


function playBirthdayMusic() {

    if (!backgroundMusic) return;

    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            if (musicToggle) {
                musicToggle.classList.add("playing");
            }

            if (musicIcon) {
                musicIcon.textContent = "♫";
            }

        })
        .catch(() => {

            musicPlaying = false;

        });

}


function pauseBirthdayMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.pause();

    musicPlaying = false;

    if (musicToggle) {
        musicToggle.classList.remove("playing");
    }

    if (musicIcon) {
        musicIcon.textContent = "♪";
    }

}


if (musicToggle) {

    musicToggle.addEventListener("click", () => {

        if (musicPlaying) {
            pauseBirthdayMusic();
        } else {
            playBirthdayMusic();
        }

    });

}

// =====================================================
// RESET EXPERIENCE FOR REPLAY
// =====================================================

function resetBirthdayExperience() {

    /* PAGE 4 — REASONS */

    openedReasons = 0;

    if (reasonsOpened) {
        reasonsOpened.textContent = "0";
    }

    reasonCards.forEach((card) => {

        card.classList.remove("revealed");

        const text =
            card.querySelector(".reason-text");

        if (text) {
            text.textContent = "";
        }

    });


    /* PAGE 5 — LETTER */

    if (openLetterButton) {
        openLetterButton.classList.remove("open");
    }

    if (letterHint) {
        letterHint.classList.remove("hidden");
    }

    if (letterNextButton) {

        letterNextButton.disabled = true;

        letterNextButton.classList.remove("unlocked");

    }


    /* PAGE 6 — GAME */

    if (typeof resetMisuuGame === "function") {
        resetMisuuGame();
    }


    /* PAGE 7 — VIDEO */

    if (birthdayVideo) {

        birthdayVideo.pause();

        birthdayVideo.currentTime = 0;

        birthdayVideo.controls = false;

    }

    if (giftStage) {
        giftStage.style.display = "";
    }

    if (openGiftButton) {
        openGiftButton.classList.remove("opening");
    }

    if (videoStage) {
        videoStage.classList.remove("show");
    }

    if (finalMessage) {
        finalMessage.classList.remove("show");
    }

    if (surpriseNextButton) {

        surpriseNextButton.disabled = true;

        surpriseNextButton.classList.remove("unlocked");

    }

}