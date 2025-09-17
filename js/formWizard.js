// Formulário wizard
class StepFormWizard {
    constructor(steps, btnNext, btnPrev, btnBackPage, sidebarSpans, stepsHeader, stepsDescription) {
        this.steps = document.querySelectorAll(steps)
        this.stepsHeader = document.querySelectorAll(stepsHeader)
        this.stepsDescription = document.querySelectorAll(stepsDescription)
        this.btnNext = document.querySelectorAll(btnNext)
        this.btnPrev = document.querySelectorAll(btnPrev)
        this.btnBackPage = document.getElementById(btnBackPage)
        this.sidebarSpans = document.querySelectorAll(sidebarSpans)
        this.activeClass = "active"
        this.currentStep = 0
    }

    showStep(index) {
        // Percorrer/controlar
        this.steps.forEach((step, i) => {
            step.style.display = i === index ? "flex" : "none";
        });

        // Percorrer/controlar - título
        this.stepsHeader.forEach((step, i) => {
            step.style.display = i === index ? "flex" : "none";
        });

        // Percorrer/controlar - descrição
        this.stepsDescription.forEach((step, i) => {
            step.style.display = i === index ? "flex" : "none";
        });

        // Controlar botão de voltar página
        if (this.btnBackPage) {
            if (index > 0) {
                this.btnBackPage.style.display = "none";
            } else {
                this.btnBackPage.style.display = "flex";
            }
        }

        // Atualizar sidebar
        if (this.sidebarSpans.length > 0) {
            this.sidebarSpans.forEach((span, i) => {
                if (i === index) {
                    span.classList.add("activeSpan");
                    span.parentElement.classList.add("activeLi");
                } else {
                    span.classList.remove("activeSpan");
                    span.parentElement.classList.remove("activeLi");
                }
            });
        }
    }

    init() {
        if (this.steps) {
            this.showStep(this.currentStep)
        }

        // Avançar
        this.btnNext.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (this.currentStep < this.steps.length - 1) {
                    this.currentStep++;
                    this.showStep(this.currentStep);
                }
            });
        });

        // Voltar
        this.btnPrev.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (this.currentStep > 0) {
                    this.currentStep--;
                    this.showStep(this.currentStep);
                }
            });
        });

        return this;
    }
}

const formWizard = new StepFormWizard(
  ".step",
  ".btn-next",
  ".btn-prev",
  "btn-back-page",
  "#list-steps span",
  ".step-header-content",
  ".step-description-content",
);

formWizard.init();

// Mascara para o input phone e perido na empresa
IMask(document.getElementById("phone"), {
    mask: '(00) 00000-0000'
});

const container = document.getElementById("step-experience");
const btnAdd = document.querySelector("#btn-add-experience button");

btnAdd.addEventListener("click", () => {
    console.log("aaa")
  // Pega o primeiro bloco de experiência
  const firstItem = container.querySelector("fieldset");
  
  // Clona o bloco
  const newItem = firstItem.cloneNode(true);

  // Limpa os valores dos inputs
  newItem.querySelectorAll("input").forEach(input => input.value = "");

  // Adiciona ao container
  container.appendChild(newItem);
});