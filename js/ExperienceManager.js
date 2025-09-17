// class ExperienceManager
class ExperienceManager {
    constructor(containerSelector, btnAddSelector) {
        this.container = document.querySelector(containerSelector);
        this.btnAdd = document.querySelector(btnAddSelector);
    }

    init() {
        if (!this.container || !this.btnAdd) return;

        // Prepara os inputs iniciais com data-base
        this.container.querySelectorAll("fieldset input").forEach((input) => {
            if (!input.hasAttribute("data-base")) {
                input.setAttribute("data-base", input.name.replace(/-\d+$/, ""));
            }
        });

        // Botão adicionar experiência
        this.btnAdd.addEventListener("click", (e) => {
            e.preventDefault();
            this.addExperience();
        });

        // Garante que os fieldsets iniciais tenham os botões funcionando
        this.attachTrashEvents();

        return this;
    }

    addExperience() {
        const firstItem = this.container.querySelector("fieldset");
        if (!firstItem) return;

        const newItem = firstItem.cloneNode(true);

        // Limpa os valores
        newItem.querySelectorAll("input").forEach((input) => {
            input.value = "";
        });
        
        // Ativa botão de lixeira
        const btnTrash = newItem.querySelector(".btn-trash-experience button");
        if (btnTrash) {
            btnTrash.disabled = false;
            btnTrash.classList.remove("btn-forms-disable");
            btnTrash.addEventListener("click", (e) => {
                e.preventDefault();
                newItem.remove();
                this.reindexExperiences();
            });
        }
        
        this.container.appendChild(newItem);
        this.reindexExperiences();
        applyPeriodMask();
    }

    attachTrashEvents() {
        this.container.querySelectorAll(".btn-trash-experience button").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const fieldset = btn.closest("fieldset");
                if (fieldset) {
                    fieldset.remove();
                    this.reindexExperiences();
                }
            });
        });
    }

    reindexExperiences() {
        const fieldsets = this.container.querySelectorAll("fieldset");

        fieldsets.forEach((fieldset, index) => {
            const number = index + 1; // começa em 1
            fieldset.querySelectorAll("input").forEach((input) => {
                if (!input.hasAttribute("data-base")) {
                    input.setAttribute("data-base", input.name.replace(/-\d+$/, ""));
                }
                const baseName = input.getAttribute("data-base");
                const newAttr = `${baseName}-${number}`;
                input.id = newAttr;
                input.name = newAttr;

                const label = input.closest("div").querySelector("label");
                if (label) {
                    label.setAttribute("for", newAttr);
                }
            });
        });
    }
}

// Instância da classe <ExperienceManager>
const expManager = new ExperienceManager (
    "#box-list-experiences", 
    "#btn-add-experience button",
);

// Chamando metodo init
expManager.init();

// Mascara para o input período na parte dados da experiencia
function applyPeriodMask() {
    const periodInputs = document.querySelectorAll("input[name^='periodo']");
    
    periodInputs.forEach(input => {
        // Evita reaplicar IMask em um input que já tenha
        if (!input.maskRef) {
            const mask = IMask(input, {
                mask: 'MMM. 0000 - MMM. 0000',
                blocks: {
                    MMM: {
                        mask: IMask.MaskedEnum,
                        enum: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                    }
                }
            });
            input.maskRef = mask;
        }
    });
}

// Aplicar máscara inicialmente
applyPeriodMask();