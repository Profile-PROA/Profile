// class EducationManager
class EducationManager {
    constructor(containerSelector, btnAddSelector) {
        this.container = document.querySelector(containerSelector);
        this.btnAdd = document.querySelector(btnAddSelector);
    }

    init() {
        if (!this.container || !this.btnAdd) return;

        // Prepara os inputs iniciais com data-base
        this.container.querySelectorAll("fieldset .input-curriculum").forEach((input) => {
            if (!input.hasAttribute("data-base")) {
                input.setAttribute("data-base", input.name.replace(/-\d+$/, ""));
            }
        });

        // Botão adicionar educação
        this.btnAdd.addEventListener("click", (e) => {
            e.preventDefault();
            this.addEducation();
        });

        // Garante que os fieldsets iniciais tenham os botões funcionando
        this.attachTrashEvents();

        return this;
    }

    addEducation() {
        const firstItem = this.container.querySelector("fieldset");
        if (!firstItem) return;

        const newItem = firstItem.cloneNode(true);

        // Limpa os valores
        newItem.querySelectorAll(".input-curriculum").forEach((input) => {
            input.value = "";
        });
        
        // Ativa botão de lixeira
        const btnTrash = newItem.querySelector(".btn-trash-education button");
        if (btnTrash) {
            btnTrash.disabled = false;
            btnTrash.classList.remove("btn-forms-disable");
            btnTrash.addEventListener("click", (e) => {
                e.preventDefault();
                newItem.remove();
                this.reindexEducations();
            });
        }
        
        this.container.appendChild(newItem);
        this.reindexEducations();
        applyPeriodMask();
    }

    attachTrashEvents() {
        this.container.querySelectorAll(".btn-trash-education button").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const fieldset = btn.closest("fieldset");
                if (fieldset) {
                    fieldset.remove();
                    this.reindexEducations();
                }
            });
        });
    }

    reindexEducations() {
        const fieldsets = this.container.querySelectorAll("fieldset");

        fieldsets.forEach((fieldset, index) => {
            const number = index + 1; // começa em 1
            fieldset.querySelectorAll(".input-curriculum").forEach((input) => {
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

// Instância da classe <EducationManager>
const eduManager = new EducationManager (
    "#box-list-educations", 
    "#btn-add-education button",
);

// Chamando metodo init
eduManager.init();

// Mascara para o input período na parte dados da educação
function applyPeriodMask() {
    const periodStartInputs = document.querySelectorAll("input[name^='periodoInicio']");
    const periodEndInputs = document.querySelectorAll("input[name^='periodoTermino']");
    
    // Início - só data
    periodStartInputs.forEach(input => {
        if (!input.maskRef) {
            const mask = IMask(input, {
                mask: 'MMM. 0000',
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

    // Término - data OU "cursando"
    periodEndInputs.forEach(input => {
        if (!input.maskRef) {
            const mask = IMask(input, {
                mask: [
                    {
                        mask: 'MMM. 0000',
                        blocks: {
                            MMM: {
                                mask: IMask.MaskedEnum,
                                enum: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                            }
                        }
                    },
                    {
                        mask: 'cursando'
                    }
                ]
            });
            input.maskRef = mask;
        }
    });
}

// Aplicar máscara inicialmente
applyPeriodMask();