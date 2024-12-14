// Constantes e Configurações
const WATER_INTAKE_PER_KG = 35; // ml por kg
const MINIMUM_WEIGHT = 1; // peso mínimo válido em kg

// Função para alternar tema (Claro/Escuro)
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Salvar o tema escolhido no localStorage
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Função para calcular ingestão de água com base no peso
function calculateWaterIntake() {
  const weightInput = document.getElementById("weight");
  const resultElement = document.getElementById("result");
  const containerResult = document.querySelector(".container-result");

  const weight = parseFloat(weightInput.value);

  // Remover classes anteriores para atualização de feedback visual
  containerResult.classList.remove("error", "success");

  // Validação do peso inserido
  if (isNaN(weight) || weight < MINIMUM_WEIGHT) {
    resultElement.textContent =
      "Por favor, insira um peso válido (acima de 1 kg).";
    containerResult.classList.add("error");
    return;
  }

  // Cálculo da quantidade de água recomendada
  const waterIntake = (weight * WATER_INTAKE_PER_KG) / 1000; // Conversão para litros

  resultElement.textContent = `Você deve beber aproximadamente ${waterIntake.toFixed(
    2
  )} litros de água por dia.`;
  containerResult.classList.add("success");
}

// Função para inicializar o gráfico de benefícios da água
function initWaterBenefitsChart() {
  const chartElement = document.getElementById("water-chart");
  if (!chartElement) return; // Verifica se o elemento existe

  const ctx = chartElement.getContext("2d");

  const waterBenefitsData = {
    labels: ["Hidratação", "Energia", "Digestão", "Pele", "Cérebro"],
    values: [90, 85, 80, 75, 70],
  };

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: waterBenefitsData.labels,
      datasets: [
        {
          label: "Benefícios da Água",
          data: waterBenefitsData.values,
          backgroundColor: "rgba(43, 126, 182, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Melhor responsividade
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
            },
          },
        },
        title: {
          display: true,
          text: "Benefícios da Água",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
}

// Função para lidar com a tecla Enter no campo de entrada de peso
function handleEnterKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita o comportamento padrão
    calculateWaterIntake();
  }
}

// Função para restaurar o tema salvo no localStorage
function restoreTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Função de inicialização principal
function init() {
  // Restaurar tema salvo
  restoreTheme();

  // Adicionar eventos aos botões
  const themeToggleButton = document.getElementById("theme-toggle");
  const calculateButton = document.getElementById("calc-btn");
  const weightInput = document.getElementById("weight");

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateWaterIntake);
  }

  // Adicionar evento de tecla ao input de peso
  if (weightInput) {
    weightInput.addEventListener("keypress", handleEnterKeyPress);
  }

  // Inicializar gráfico
  initWaterBenefitsChart();
}

// Executar inicialização quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", init);
