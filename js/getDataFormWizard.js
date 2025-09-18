// Seleciona o botão da última etapa
const btnContinue = document.querySelector("#step-preferences .btn-next");

// Evento para pegar dados - fazer requisição e retornar 
btnContinue.addEventListener("click", async (e) => {
    e.preventDefault();

    // Seleciona todo o form
    const form = document.getElementById("form-wizard");

    // Objeto para armazenar os dados
    const formData = {};

    // 1 Dados pessoais
    formData.personalData = {
        fullName: form.fullName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        linkedin: form.linkedin.value.trim(),
        state: form.state.value.trim(),
        city: form.city.value.trim(),
        portfolio: form.portfolio.value.trim()
    };

    // 2 Experiências
    formData.experiences = [];
    const experienceFieldsets = document.querySelectorAll("#box-list-experiences fieldset");

    experienceFieldsets.forEach((fs) => {
        formData.experiences.push({
            cargo: fs.querySelector("input[name^='cargo']").value.trim(),
            empresa: fs.querySelector("input[name^='empresa']").value.trim(),
            periodo: fs.querySelector("input[name^='periodoExperiencia']").value.trim(),
            atividades: fs.querySelector("input[name^='atividades']").value.trim(),
            resultados: fs.querySelector("input[name^='resultados']").value.trim(),
        });
    });

    // 3 Habilidades
    formData.skills = {
        techniques: form.Techniques.value.trim(),
        interpersonal: form.Interpersonal.value.trim()
    };

    // 4 Educação
    formData.educations = [];
    const educationFieldsets = document.querySelectorAll("#box-list-educations fieldset");

    educationFieldsets.forEach((fs) => {
        formData.educations.push({
            nivel: fs.querySelector("select[name^='nivel']").value.trim(),
            curso: fs.querySelector("input[name^='curso']").value.trim(),
            periodoInicio: fs.querySelector("input[name^='periodoInicio']").value.trim(),
            periodoTermino: fs.querySelector("input[name^='periodoTermino']").value.trim(),
            instituicao: fs.querySelector("input[name^='instituicao']").value.trim(),
        });
    });

    // 5 Preferências
    const preference = form.querySelector("input[name='preference']:checked");
    formData.preference = preference ? preference.value : null;

    // Prompt inteligente
    const prompt = `
        Você é um especialista em RH e recrutamento. 
        Com base nos dados abaixo, crie um CURRÍCULO COMPLETO no estilo **${formData.preference}**.

        REGRAS IMPORTANTES:
            - Use uma linguagem formal, objetiva e clara.
            - Organize as seções de forma estruturada: Dados Pessoais, Resumo Profissional, Experiências, Formação Acadêmica, Habilidades, Links.
            - Adapte o estilo conforme o modelo escolhido:
                • Big Tech → direto, focado em resultados e impacto.
                • Startup → criativo, dinâmico e com energia inovadora.
                • Tradicional → formal, conservador, alinhado a empresas mais rígidas.
                • ATS-Friendly → sem gráficos, otimizado para passar em sistemas automáticos (palavras-chave fortes, listas simples).
            - O currículo deve caber em até 2 páginas.

        DADOS DO CANDIDATO:
            Nome: ${formData.personalData.fullName}
            E-mail: ${formData.personalData.email}
            Telefone: ${formData.personalData.phone}
            LinkedIn: ${formData.personalData.linkedin}
            Cidade/Estado: ${formData.personalData.city} - ${formData.personalData.state}
            Portfólio: ${formData.personalData.portfolio}

        EXPERIÊNCIAS:
        ${formData.experiences.map((exp, i) => `
            ${i + 1}) Cargo: ${exp.cargo}
            Empresa: ${exp.empresa}
            Período: ${exp.periodo}
            Atividades: ${exp.atividades}
            Resultados: ${exp.resultados}
        `).join("\n")}

        FORMAÇÃO ACADÊMICA:
        ${formData.educations.map((edu, i) => `
            ${i + 1}) ${edu.nivel} em ${edu.curso}
            Instituição: ${edu.instituicao}
            Período: ${edu.periodoInicio} - ${edu.periodoTermino}
        `).join("\n")}

        HABILIDADES:
            Técnicas: ${formData.skills.techniques}
            Interpessoais: ${formData.skills.interpersonal}
        
        Observação: Apenas forneça o conteúdo do currículo. Não inclua observações, dicas ou comentários. Caso algum dado do candidato, experiência profissional ou formação acadêmica esteja vazio, desconsidere, deixa vazio e inclua apenas as informações disponíveis.
        Traga todas essa infromação estruturado em HTML de forma bem elaborada com css basico inline usando apenas id = # no css apartir do html section sem ser o documento completo do HMLT%
    `;

    async function callApi(prompt) {
        const API_KEY = "AIzaSyBjsBZtsVuoCXa6atp0j5CFoAGU30bc_NU";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            // O texto gerado pelo Gemini fica em data.candidates[0].content.parts[0].text
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "Nenhum conteúdo gerado.";

            console.log("Resposta do Gemini:", output);

            return output;
        } catch (error) {
            console.error("Erro na requisição:", error);
            return null;
        }
    }

    const htmlLimpo = (await callApi(prompt)).replace(/^```html\s*/, '').replace(/\s*```$/, '').replace(/```$/, '');

    // Exibe o resultado
    document.querySelector('#contentPdf').innerHTML = htmlLimpo;
    console.log(callApi(prompt))
});