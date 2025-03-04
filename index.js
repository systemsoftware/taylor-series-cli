const math = require('mathjs');
const chalk = require('chalk').default;

// Suppress ExperimentalWarning for CommonJS loading ESM
const originalEmit = process.emit;
process.emit = function (event, warning) {
    if (event === 'warning' && warning.name === 'ExperimentalWarning') {
        return false;
    }
    return originalEmit.apply(process, arguments);
}; 

function nthDerivative(expr, variable, n) {
    let result = expr;
    for (let i = 0; i < n; i++) {
        result = math.derivative(result, variable).toString();
    }
    return result;
}

function formatTerm(coefficient, exponent, a) {
    if (Math.abs(coefficient) < 1e-10) return ''; 

    let term = '';

    let formattedCoefficient = math.fraction(coefficient).toFraction();
    if(formattedCoefficient.length > 5) formattedCoefficient = coefficient.toFixed(6);

    if (coefficient === 1 && exponent !== 0) {
        term += ''; 
    } else if (coefficient === -1 && exponent !== 0) {
        term += '- ';
    } else {
        term += formattedCoefficient;
    }

    if (exponent > 0) {
        if(a == 0) return term + `x^${exponent}`;
        term += `(x - ${a})`;
        if (exponent > 1) term += `^${exponent}`;
    }

    return term;
}

function taylorSeries(func, a, terms) {
    let series = '';
    let nonZeroTerms = 0;

    for (let i = 0; i < terms; i++) {
        let derivativeExpr = nthDerivative(func, 'x', i);
        let num = math.evaluate(derivativeExpr, { x: a });

        if (Math.abs(num) < 1e-10) continue; 

        let denom = math.factorial(i);
        let coefficient = num / denom;
        let term = formatTerm(coefficient, i, a);

        if (term) {
            if (series && coefficient > 0) series += chalk.green(' + ') + term;
            if (series && coefficient < 0) series += chalk.red(' - ') + term.replace('-', '');
            if (!series) series += term; 
            nonZeroTerms++;
        }
    }

    return [`${chalk.yellow(func)} ≈ ${series}`, nonZeroTerms];
}

let func = process.argv[2] || 'sin(x)';
let a = parseFloat(process.argv[3] ?? 0);
let n = parseInt(process.argv[4]) || 10;

const [series, nonZeroTerms] = taylorSeries(func, a, n);
const seriesWOColor = series.replace(/\x1B\[[0-9;]*m/g, '').split('≈')[1].trim();

console.log(chalk.yellow(func), 'around', chalk.yellow(a), 'with', chalk.yellow(nonZeroTerms), 'non-zero terms (' + chalk.yellow(n), 'max terms)');
console.log(chalk.blue('-'.repeat(process.stdout.columns > seriesWOColor.length ? seriesWOColor.length : process.stdout.columns)));
console.log(series);
console.log(chalk.blue('-'.repeat(process.stdout.columns > seriesWOColor.length ? seriesWOColor.length : process.stdout.columns)));