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

// Configuração inicial do tema
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector(".material-icons-outlined");
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

// Gráfico de área
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

// Alternância entre modo claro e escuro
if (themeToggle && themeIcon) {
    function applyTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);
        themeIcon.textContent = isLight ? "dark_mode" : "light_mode";
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Ativar modo escuro" : "Ativar modo claro"
        );
        localStorage.setItem("theme", theme);
        updateChartsTheme();
    }

    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        applyTheme(isLight ? "dark" : "light");
    });
}