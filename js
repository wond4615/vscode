

let balance = 100;

function placeBet() {
    const betAmountInput = document.getElementById('bet-amount') as HTMLInputElement;
    const driverSelect = document.getElementById('driver') as HTMLSelectElement;

    // Verifica se os elementos existem
    if (!betAmountInput || !driverSelect) {
        alert('Erro: Elementos não encontrados!');
        return;
    }

    // Converte os elementos para tipos apropriados
    const betAmount = parseInt(betAmountInput.value);
    const selectedDriver = parseInt(driverSelect.value);

    // Verifica se o valor da aposta é válido
    if (isNaN(betAmount)) {
        alert('Por favor, insira um valor válido para a aposta!');
        return;
    }
    
    // Verifica se o saldo é suficiente para a aposta
    if (betAmount > balance) {
        alert('Você não tem saldo suficiente!');
        return;
    }
    
    // Verifica se o valor da aposta é maior que o mínimo
    if (betAmount < 5) {
        alert('A aposta mínima é R$5!');
        return;
    }
    
    // Inicia a corrida com a aposta e o piloto selecionado
    startRace(betAmount, selectedDriver);
}

function startRace(betAmount, selectedDriver) {
    const raceTrackWidth = 90;
    const raceDuration = 3000;

    let carPositions = [0, 0, 0, 0, 0];

    const raceInterval = setInterval(() => {
        for (let i = 0; i < carPositions.length; i++) {
            carPositions[i] += Math.floor(Math.random() * 5) + 1;
            if (carPositions[i] >= raceTrackWidth) {
                clearInterval(raceInterval);
                const winner = i + 1;
                announceResult(betAmount, selectedDriver, winner);
                return;
            }
            document.getElementById(`car${i + 1}`).style.marginLeft = `${carPositions[i]}%`;
        }
    }, 50);
}



function announceResult(betAmount, selectedDriver, winner) {
    if (winner === selectedDriver) {
        balance += betAmount * 2;
        alert(`Parabéns! Você ganhou! Seu novo saldo é R$${balance}.`);
    } else {
        balance -= betAmount;
        alert(`Desculpe! Você perdeu. Seu novo saldo é R$${balance}.`);
    }
    const balanceDisplay = document.getElementById('balance');
    if (balanceDisplay) {
        balanceDisplay.textContent = `Saldo: R$${balance}`;
    } else {
        console.error('Erro: Elemento de exibição de saldo não encontrado!');
    }
}

