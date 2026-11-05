/* ==========================================
   AURA — ONBOARDING ENGINE
========================================== */

/* ==========================================
   SLIDE DATA
========================================== */

const slides = [
  {
    eyebrow: "A NEW WAY TO EXPERIENCE LIFE",

    number: "01 / 03",

    heading: "Discover your <em>potential.</em>",

    description:
      "Everything you need to organise your world, unlock your creativity and make every day count.",

    button: "Continue",

    caption: "THINK WITHOUT LIMITS.",
  },

  {
    eyebrow: "YOUR WORLD. ONE SPACE.",

    number: "02 / 03",

    heading: "Everything in <em>one place.</em>",

    description:
      "Bring your ideas, tasks and projects together. Stay focused, stay organised and take control of your day.",

    button: "Continue",

    caption: "SIMPLIFY YOUR WORKFLOW.",
  },

  {
    eyebrow: "YOUR JOURNEY STARTS HERE.",

    number: "03 / 03",

    heading: "Make every moment <em>count.</em>",

    description:
      "Great things start with a single step. Your next chapter is waiting. Let's make something extraordinary.",

    button: "Get Started",

    caption: "MAKE IT HAPPEN.",
  },
];

/* ==========================================
   DOM ELEMENTS
========================================== */

const onboarding = document.getElementById("onboarding");

const heading = document.getElementById("heading");

const description = document.getElementById("description");

const eyebrowText = document.getElementById("eyebrowText");

const slideNumber = document.getElementById("slideNumber");

const buttonText = document.getElementById("buttonText");

const captionText = document.getElementById("captionText");

const visualNumber = document.getElementById("visualNumber");

const nextBtn = document.getElementById("nextBtn");

const skipBtn = document.getElementById("skipBtn");

const dots = document.querySelectorAll(".dot");

const visualCards = document.querySelectorAll(".visual-card");

/* ==========================================
   APPLICATION STATE
========================================== */

let currentSlide = 0;

let isTransitioning = false;

let isFinished = false;

/* ==========================================
   UPDATE ONBOARDING SLIDE
========================================== */

function updateSlide(index) {
  if (isTransitioning || isFinished) return;

  if (index < 0 || index >= slides.length) return;

  if (index === currentSlide) return;

  isTransitioning = true;

  currentSlide = index;

  const slide = slides[index];

  // Update text content

  heading.innerHTML = slide.heading;

  description.textContent = slide.description;

  eyebrowText.textContent = slide.eyebrow;

  slideNumber.textContent = slide.number;

  buttonText.textContent = slide.button;

  captionText.textContent = slide.caption;

  visualNumber.textContent = `0${index + 1} — 03`;

  // Update pagination

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);

    if (i === index) {
      dot.setAttribute("aria-current", "step");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  // Update artwork

  visualCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  // Release transition lock

  setTimeout(() => {
    isTransitioning = false;
  }, 700);
}

/* ==========================================
   NEXT BUTTON
========================================== */

nextBtn.addEventListener("click", () => {
  if (isTransitioning || isFinished) return;

  if (currentSlide < slides.length - 1) {
    updateSlide(currentSlide + 1);
  } else {
    finishOnboarding();
  }
});

/* ==========================================
   SKIP BUTTON
========================================== */

skipBtn.addEventListener("click", () => {
  finishOnboarding();
});

/* ==========================================
   PAGINATION
========================================== */

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateSlide(index);
  });
});

/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener("keydown", (event) => {
  if (isFinished) return;

  // Enter or right arrow

  if (event.key === "Enter" || event.key === "ArrowRight") {
    if (event.target.closest("button") && event.key === "Enter") {
      return;
    }

    if (currentSlide < slides.length - 1) {
      updateSlide(currentSlide + 1);
    } else {
      finishOnboarding();
    }
  }

  // Left arrow

  if (event.key === "ArrowLeft") {
    updateSlide(currentSlide - 1);
  }
});

/* ==========================================
   FINISH ONBOARDING
========================================== */

function finishOnboarding() {
  if (isFinished || isTransitioning) return;

  isFinished = true;

  onboarding.innerHTML = `

        <div class="content-section">

            <div class="eyebrow">

                <span class="eyebrow-line"></span>

                WELCOME TO AURA

            </div>


            <div class="text-content">

                <h1 class="finish-heading">

                    Your next chapter

                    <em>starts now.</em>

                </h1>


                <p id="description">

                    You're all set. Explore new possibilities,
                    discover your potential and make every moment count.

                </p>

            </div>


            <div class="button-group">

                <button class="primary-button" id="restartBtn">

                    <span>Explore Again</span>

                    <span class="button-arrow">↗</span>

                </button>

            </div>

        </div>



        <div class="visual-section">

            <div class="finish-artwork">

                <span class="artwork-index">

                    WELCOME — 2026

                </span>


                <h2>

                    THE<br>

                    <em>BEGINNING.</em>

                </h2>


                <div class="final-divider"></div>


                <div class="final-message">

                    THINK DIFFERENTLY.<br>

                    CREATE FEARLESSLY.

                </div>

            </div>

        </div>

    `;

  // Hide skip button

  skipBtn.style.display = "none";

  // Update navigation label

  document.querySelector(".nav-label").textContent =
    "WELCOME TO THE EXPERIENCE";

  // Restart interaction

  document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
  });
}

/* ==========================================
   LIVE PARTICLE BACKGROUND
========================================== */

const canvas = document.getElementById("particleCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

let canvasWidth = 0;

let canvasHeight = 0;

const PARTICLE_COUNT = 75;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ==========================================
   CREATE PARTICLE
========================================== */

function createParticle(randomPosition = false) {
  return {
    x: Math.random() * canvasWidth,

    y: randomPosition
      ? Math.random() * canvasHeight
      : canvasHeight + Math.random() * 100,

    width: Math.random() * 1.5 + 0.5,

    height: Math.random() * 3 + 2,

    speed: Math.random() * 0.55 + 0.2,

    opacity: Math.random() * 0.35 + 0.12,

    drift: (Math.random() - 0.5) * 0.25,
  };
}

/* ==========================================
   RESIZE CANVAS
========================================== */

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;

  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * pixelRatio;

  canvas.height = canvasHeight * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle(true));
  }
}

/* ==========================================
   DRAW PARTICLES
========================================== */

function drawParticles() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle, index) => {
    // Move upwards

    particle.y -= particle.speed;

    // Slight horizontal movement

    particle.x += particle.drift;

    // Reset after reaching the top

    if (particle.y < -10) {
      particles[index] = createParticle();

      return;
    }

    // Horizontal boundary

    if (particle.x < 0) {
      particle.x = canvasWidth;
    }

    if (particle.x > canvasWidth) {
      particle.x = 0;
    }

    // Subtle colour variation

    const colour = Math.random() > 0.88 ? "137,153,119" : "40,42,36";

    ctx.fillStyle = `rgba(
            ${colour},
            ${particle.opacity}
        )`;

    // Rectangular particles

    ctx.fillRect(
      particle.x,

      particle.y,

      particle.width,

      particle.height,
    );
  });

  if (!reducedMotion) {
    requestAnimationFrame(drawParticles);
  }
}

/* ==========================================
   INITIALISE PARTICLES
========================================== */

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

drawParticles();

/* ==========================================
   END OF AURA
========================================== */
