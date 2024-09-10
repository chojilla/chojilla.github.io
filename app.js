const cellTypes = {
    '0': 'Blasts',
    '1': 'Promyelocytes',
    '2': 'Myelocytes',
    '3': 'Metamyelocytes',
    '4': 'Bands',
    '5': 'Segmented Neutrophils',
    '6': 'Lymphocytes',
    '7': 'Monocytes',
    '8': 'Eosinophils',
    '9': 'Basophils',
    '.': 'Nucleated RBCs'
};

let counts = Object.fromEntries(Object.keys(cellTypes).map(key => [key, 0]));

function updateDisplay() {
    const counterDisplay = document.getElementById('counter-display');
    counterDisplay.innerHTML = '';
    
    for (const [key, cellType] of Object.entries(cellTypes)) {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell-type';
        cellDiv.textContent = `${cellType}: ${counts[key]}`;
        counterDisplay.appendChild(cellDiv);
    }
    
    updateTotalAndPercentages();
}

function updateTotalAndPercentages() {
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    document.getElementById('total-count').textContent = `Total: ${total}`;
    
    const percentageDisplay = document.getElementById('percentage-display');
    percentageDisplay.innerHTML = '';
    for (const [key, cellType] of Object.entries(cellTypes)) {
        const percentage = total > 0 ? (counts[key] / total * 100).toFixed(1) : 0;
        percentageDisplay.innerHTML += `${cellType}: ${percentage}%<br>`;
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (cellTypes.hasOwnProperty(key)) {
        counts[key]++;
        updateDisplay();
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    counts = Object.fromEntries(Object.keys(cellTypes).map(key => [key, 0]));
    updateDisplay();
});

document.getElementById('save-btn').addEventListener('click', () => {
    const results = Object.entries(cellTypes).map(([key, cellType]) => 
        `${cellType}: ${counts[key]}`
    ).join('\n');
    const blob = new Blob([results], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cell_count_results.txt';
    a.click();
});

updateDisplay();
