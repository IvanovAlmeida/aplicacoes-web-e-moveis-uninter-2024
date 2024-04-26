window.onload = () => {
    registrarEventosMenu();

    inicializarPagina();

    registrarEventosCursos();
}

/**
 * Inicializa na página correta com o item do menu marcado.
 * @returns void
 */
function inicializarPagina() {
    let rota = window.location.hash;
    if (rota === '') {
        rota = '#sobre';
    }

    const itemMenu = obeterItensMenu().find(i => i.hash === rota);
    if (!itemMenu) {
        throw new Error('Não foi possível encontrar página!');
    }

    itemMenu.click();
}

/**
 * Registra os eventos para o menu
 */
function registrarEventosMenu() {
    obeterItensMenu()
        .forEach(item => item.addEventListener('click', onClickMenuItem));
}

/**
 * Evento de click do item do menu para exibir o conteudo correspondente e ocultar os demais
 * @param {*} event 
 */
function onClickMenuItem(event) {    
    limparItemAtivosMenu();
    ocultarSections();

    event.target.classList.add('active');

    const section = obterItensSections()
        .find(x => x.attributes.id.value === event.target.ariaValueText);

    section?.classList.remove('hidden');
}

/**
 * Desmarca qualquer item ativo do menu
 */
function limparItemAtivosMenu() {
    obeterItensMenu()
        .forEach(item => item.classList.remove('active'));
}

/**
 * Retorna a lista de itens do menu.
 * @returns HTMLAnchorElement[]
 */
function obeterItensMenu() {
    const menu = document.getElementById('menu');
    if (!menu) {
        throw new Error('Não foi possível encontrar o elemento menu!');
    }

    // Destruindo o HTMLCollection em um Array
    return [...menu.getElementsByTagName('a')];
}

/**
 * Oculta todas as sessões de conteudo
 */
function ocultarSections() {
    obterItensSections()
        .forEach(section => {
            section?.classList.add('hidden');
        });
}

/**
 * Retorna a lista de itens do content.
 * @returns HTMLAnchorElement[]
 */
function obterItensSections() {
    const content = document.getElementById('content')
    if (!content) {
        throw new Error('Não foi possível encontrar o elemento content!');
    }

    // Destruindo o HTMLCollection em um Array
    return [...content.getElementsByClassName('section')];
}

/**
 * Simula o envio do formulário de contato
 * @param {*} event 
 */
function enviarFormulario(event) {
    event.preventDefault();

    const msg = event.target.getElementsByClassName('msg-sucesso');
    if (msg[0]) {
        msg[0].classList.remove('hidden');

        setTimeout(() => {
            msg[0].classList.add('hidden');
        }, 3 * 1000);
    }

    event.target.reset();
}

/**
 * Registra os eventos de click na seção de cursos da formação
 */
function registrarEventosCursos() {
    const certificados = [...document.getElementsByClassName('certificado-link')];
    certificados.forEach(cert => cert.addEventListener('click', clickCurso));
}

/**
 * Abre o link em uma nova guia
 * @param {*} event 
 */
function clickCurso(event) {
    const url = event.target.ariaValueText;    
    window.open(url, '_blank').focus();
}