// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function init(hypos) {
    const dict = {};
    const half = parseInt(hypos.length / 2, 10) + 1;
    for (var i = 0; i < half; i++) {
        dict[i] = hypos[i];
    }
    for (var i = half; i < hypos.length; i++) {
        dict[i] = 100 - hypos[i];
    }
    return dict;
}

// 모든 가설을 돌며 mix의 data에 해당하는 값을 곱해 업데이트한다
function update(dict, data) {

    Object.keys(dict).forEach((hypo) => {
        dict[hypo] = dict[hypo] * likelihood(data, hypo);
    });

    // return dict;
    return normalize(dict);
}

// p(D | H_n)
function likelihood(data, hypo) {
    const x = hypo;
    if (data == 'H') {
        return x/100.0;
    }
    return (100 - x)/100.0;
}

function range(start, size) {
    return [...Array(size).keys()].map((n) => n + start);
}

// 모든 가설의 확률의 비율을 유지하며, 총합이 1이 되도록 정규화한다
function normalize(dict) {
    const values = Object.values(dict);
    const sum = values.reduce((a, b) => a + b);
    const result = {};
    Object.keys(dict).forEach((key) => {
        result[key] = dict[key] / sum;
    });
    return result;
}

function main(max) {
    const hypos = range(0, max);
    let suite = init(hypos);

    const datasetA = range(1, 140).map(() => 'H');
    const datasetB = range(1, 110).map(() => 'T');
    const dataset = datasetA.concat(datasetB);

    dataset.forEach((coin) => {
        suite = update(suite, coin);
    });

    Object.keys(suite).forEach((key) => {
        console.log(key + '\t' + suite[key]);
    });

    var max = Object.keys(suite).sort((a, b) => {
        if (suite[a] > suite[b]) {
            return -1;
        }
        if (suite[a] < suite[b]) {
            return 1;
        }
        return 0
    })[0];
    console.log('max n : ' + max + ' (' + suite[max] + ')')

    let mean = 0;
    Object.keys(suite).forEach((key) => {
        mean += key * suite[key];
    });
    console.log('mean : ' + mean);


    const keys = Object.keys(suite);

    let p5 = 0;
    let p5total = 0;
    for(let i = 0; i < keys.length; i++) {
        const val = keys[i];
        const prob = suite[val];
        p5total += prob;
        if (p5total >= 0.05) {
            p5 = val;
            break;
        }
    }

    let p95 = 0;
    let p95total = 0;
    for(let i = 0; i < keys.length; i++) {
        const val = keys[i];
        const prob = suite[val];
        p95total += prob;
        if (p95total >= 0.95) {
            p95 = val;
            break;
        }
    }
    console.log({ '5%': p5, '95%': p95});
}

main(101)
