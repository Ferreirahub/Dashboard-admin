let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar-open");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove("sidebar-open");
        sidebarOpen = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.querySelectorAll(".sidebar-list-item");
    const tabContents = document.querySelectorAll(".tab-content");

    menuButtons.forEach(button => {
        button.addEventListener("click", () => {
            menuButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const targetId = button.getAttribute("data-target");
            tabContents.forEach(tab => tab.classList.remove("active"));
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add("active");
            }
            if (window.matchMedia("(max-width: 1100px)").matches) {
                closeSidebar();
            }
        });
    });

    const configModoEscuro = document.getElementById("config-modo-escuro");
    const todosToggles = document.querySelectorAll(".toggle-switch");

    todosToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            if (toggle !== configModoEscuro) {
                toggle.classList.toggle("active");
            }
        });
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeSidebar();
    }
});

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector(".material-icons-outlined");
const configModoEscuro = document.getElementById("config-modo-escuro");
const savedTheme = localStorage.getItem("theme") || "dark";

document.body.classList.toggle("light-theme", savedTheme === "light");

function getChartThemeColors() {
    const isLight = document.body.classList.contains("light-theme");

    return {
        text: isLight ? "#263746" : "#eaf2f8",
        grid: isLight ? "#d7e0e8" : "#344454",
    };
}

const initialChartTheme = getChartThemeColors();

// Gráfico de barras
const barOptions = {
    series: [
        {
            name: "Produtos Vendidos",
            data: [400, 430, 448, 470, 540, 580, 690],
        },
    ],
    chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        foreColor: initialChartTheme.text,
        background: "transparent",
    },
    colors: ["#2563eb", "#d97706", "#16a34a", "#dc2626", "#7c3aed", "#0891b2", "#db2777"],
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true,
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ["#ffffff"],
            fontWeight: 600,
        },
    },
    xaxis: {
        categories: ["Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        labels: {
            style: { colors: initialChartTheme.text },
        },
    },
    yaxis: {
        reversed: true,
        labels: {
            style: { colors: initialChartTheme.text },
        },
    },
    grid: {
        borderColor: initialChartTheme.grid,
    },
    legend: {
        show: false,
    },
};

const barChart = new ApexCharts(document.querySelector("#bar-chart"), barOptions);
barChart.render();

// Gráfico de área 2
const areaChartOptions = {
    series: [
        {
            name: "Pedidos de Compra",
            data: [35, 41, 36, 51, 42, 109, 100],
        },
        {
            name: "Pedidos de Venda",
            data: [11, 60, 90, 65, 70, 105, 80],
        },
    ],
    chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
        foreColor: initialChartTheme.text,
        background: "transparent",
    },
    colors: ["#00b8d9", "#ff4d6d"],
    stroke: {
        curve: "smooth",
        width: 3,
    },
    markers: {
        size: 4,
        strokeColors: savedTheme === "light" ? "#ffffff" : "#0b1623",
        hover: { size: 6 },
    },
    xaxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
        labels: {
            style: { colors: initialChartTheme.text },
        },
    },
    yaxis: {
        labels: {
            style: { colors: initialChartTheme.text },
        },
    },
    legend: {
        position: "top",
        labels: {
            colors: initialChartTheme.text,
        },
    },
    grid: {
        borderColor: initialChartTheme.grid,
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.08,
            stops: [0, 90, 100],
        },
    },
};

const areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();

function updateChartsTheme() {
    const colors = getChartThemeColors();
    const isLight = document.body.classList.contains("light-theme");

    barChart.updateOptions({
        chart: { foreColor: colors.text },
        xaxis: { labels: { style: { colors: colors.text } } },
        yaxis: { labels: { style: { colors: colors.text } } },
        grid: { borderColor: colors.grid },
    });

    areaChart.updateOptions({
        chart: { foreColor: colors.text },
        xaxis: { labels: { style: { colors: colors.text } } },
        yaxis: { labels: { style: { colors: colors.text } } },
        legend: { labels: { colors: colors.text } },
        grid: { borderColor: colors.grid },
        markers: { strokeColors: isLight ? "#ffffff" : "#0b1623" },
    });
}

function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-theme", isLight);
    
    if (themeIcon) {
        themeIcon.textContent = isLight ? "dark_mode" : "light_mode";
    }
    
    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Ativar modo escuro" : "Ativar modo claro"
        );
    }

    if (configModoEscuro) {
        if (isLight) {
            configModoEscuro.classList.remove("active");
        } else {
            configModoEscuro.classList.add("active");
        }
    }

    localStorage.setItem("theme", theme);
    updateChartsTheme();
}

applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        applyTheme(isLight ? "dark" : "light");
    });
}

if (configModoEscuro) {
    configModoEscuro.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        applyTheme(isLight ? "dark" : "light");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtn = document.getElementById("google-login-btn");

    window.onload = function () {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: "213626496986-4dneouu4k8nnu1ep76dgi37urorn2h34.apps.googleusercontent.com", 
                callback: handleGoogleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
        }
    };

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", () => {
            if (window.google) {
                google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log("O prompt foi ignorado ou bloqueado pelo navegador:", notification.getNotDisplayedReason());

                        alert("Para o pop-up do Google aparecer, certifique-se de que o seu domínio (localhost ou GitHub Pages) está autorizado no Google Cloud Console.");
                    }
                });
            } else {
                alert("A biblioteca de autenticação do Google ainda não foi carregada. Verifique a ligação à internet.");
            }
        });
    }
});


function handleGoogleCredentialResponse(response) {
    if (response.credential) {

        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);
        alert(`Login efetuado com sucesso!\n\nBem-vindo, ${userData.name}\nEmail: ${userData.email}`);

        console.log("Dados do Utilizador Google:", userData);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtn = document.getElementById("google-login-btn");

    const usuarioSalvo = localStorage.getItem("techzone_user");
    if (usuarioSalvo) {
        try {
            const user = JSON.parse(usuarioSalvo);
            atualizarPerfilUsuario(user);
        } catch (e) {
            console.error("Erro ao carregar usuário salvo:", e);
            localStorage.removeItem("techzone_user");
        }
    }

    if (window.google) {
        google.accounts.id.initialize({
            client_id: "21362649986-4dneouu4k8nnu1ep76dgi37urorn2h34.apps.googleusercontent.com",
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", () => {
            if (window.google) {
                google.accounts.id.prompt((notification) => {

                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log("Prompt ignorado ou já processado:", notification.getNotDisplayedReason());
                    }
                });
            } else {
                console.log("Biblioteca do Google indisponível no momento.");
            }
        });
    }
});

function handleGoogleCredentialResponse(response) {
    if (response.credential) {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);

        atualizarPerfilUsuario(userData);
        localStorage.setItem("techzone_user", JSON.stringify(userData));

        console.log("Login efetuado com sucesso! Dados:", userData);
    }
}

function atualizarPerfilUsuario(user) {
    const loginBtn = document.getElementById("google-login-btn");

    if (loginBtn && user.picture) {
        const userImg = document.createElement("img");
        userImg.src = user.picture;
        userImg.alt = user.name || "Perfil";
        userImg.title = `Conectado como ${user.name} (${user.email})`;

        userImg.style.width = "35px";
        userImg.style.height = "35px";
        userImg.style.borderRadius = "50%";
        userImg.style.objectFit = "cover";
        userImg.style.cursor = "pointer";
        userImg.style.border = "2px solid #4f46e5"; 

        userImg.addEventListener("click", () => {
            if (confirm(`Sessão ativa de ${user.name}. Deseja terminar a sessão?`)) {
                localStorage.removeItem("techzone_user");
                location.reload();
            }
        });

        loginBtn.parentNode.replaceChild(userImg, loginBtn);
    }
}