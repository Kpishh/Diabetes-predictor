


let currentSlide = 0;
const slides = document.querySelectorAll(".question-slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const form = document.getElementById("quizForm");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });

    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.innerText = index === slides.length - 1 ? "Submit" : "Next ⟶";
}

function validateCurrentSlide() {
    const currentInputs = slides[currentSlide].querySelectorAll("input, select");
    for (let input of currentInputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return false;
        }
    }
    return true;
}

nextBtn.addEventListener("click", () => {
    if (!validateCurrentSlide()) return;

    const isLastSlide = currentSlide === slides.length - 1;

    if (isLastSlide) {
        form.submit();
    } else {
        let nextIndex = currentSlide + 1;

        const nextSlide = slides[nextIndex];
        const skipGlucose = document.getElementById("hba1cChoice")?.value === "no";

        if (nextSlide?.id === "glucoseSlide" && skipGlucose) {
            nextIndex += 1;
        }

        // Prevent out-of-bounds error
        if (nextIndex >= slides.length) {
            form.submit();
        } else {
            currentSlide = nextIndex;
            showSlide(currentSlide);
        }
    }
});



prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

function toggleBMIInputs() {
    const choice = document.getElementById("bmiChoice").value;
    document.getElementById("bmiDirectInput").style.display = choice === "yes" ? "block" : "none";
    document.getElementById("bmiCalcInput").style.display = choice === "no" ? "block" : "none";

    // Reset values to prevent conflicts
    document.getElementById("bmiInput").required = (choice === "yes");
    document.getElementById("heightInput").required = (choice === "no");
    document.getElementById("weightInput").required = (choice === "no");
}

function calculateBMI() {
    const heightCm = parseFloat(document.getElementById("heightInput").value);
    const weightKg = parseFloat(document.getElementById("weightInput").value);

    if (!isNaN(heightCm) && !isNaN(weightKg) && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const bmiRounded = bmi.toFixed(2);
        document.getElementById("calculatedBMIText").innerText = `Calculated BMI: ${bmiRounded}`;
        document.getElementById("calculatedBMI").value = bmiRounded;
    } else {
        document.getElementById("calculatedBMIText").innerText = "";
        document.getElementById("calculatedBMI").value = "";
    }
}

function toggleHbA1cInputs() {
    const choice = document.getElementById("hba1cChoice").value;
    document.getElementById("hba1cDirectInput").style.display = choice === "yes" ? "block" : "none";
    document.getElementById("hba1cEstimateInput").style.display = choice === "no" ? "block" : "none";

    // Required management
    document.getElementById("hba1cInput").required = (choice === "yes");
    document.getElementById("glucoseForHbA1c").required = (choice === "no");
}

function estimateHbA1c() {
    const glucose = parseFloat(document.getElementById("glucoseForHbA1c").value);
    if (!isNaN(glucose) && glucose > 0) {
        const hba1c = ((glucose + 46.7) / 28.7).toFixed(2);
        document.getElementById("estimatedHbA1cText").innerText = `Estimated HbA1c: ${hba1c}%`;
        document.getElementById("estimatedHbA1c").value = hba1c;
    } else {
        document.getElementById("estimatedHbA1cText").innerText = "";
        document.getElementById("estimatedHbA1c").value = "";
    }
}


showSlide(currentSlide);
