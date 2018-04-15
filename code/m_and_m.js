// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function init(hypos) {
    const dict = {};
    hypos.forEach((h) => {
        dict[h] = 1;
    });
    return dict;
}

// 모든 가설을 돌며 mix의 dataName에 해당하는 값을 곱해 업데이트한다
function update(p, dataName) {

    Object.keys(p).forEach((hypo) => {

        // p(H_dataName) * p(D | H_dataName)
        p[hypo] = p[hypo] * likelihood(p, hypo, dataName);
    });

    return normalize(p);
}

// p(D | H_dataName)
function likelihood(dict, hypo, dataName) {
    const bag = dataName[0];
    const color = dataName[1];
    return hypotheses[hypo][bag][color];
}

// 모든 가설의 확률의 비율을 유지하며, 총합이 1이 되도록 정규화한다
function normalize(p) {
    const values = Object.values(p);
    const sum = values.reduce((a, b) => a + b);
    const result = {};
    Object.keys(p).forEach((key) => {
        result[key] = p[key] / sum;
    });
    return result;
}

const mix94 = {
    'brown': 30,
    'yellow': 20,
    'red': 20,
    'green': 10,
    'orange': 10,
    'tan': 10,
};
const mix96 = {
    'blue': 24,
    'green': 20,
    'orange': 16,
    'yellow': 14,
    'red': 13,
    'brown': 13,
};
const hypotheses = {
    'A': {
        'bag1': mix94,
        'bag2': mix96,
    },
    'B': {
        'bag1': mix96,
        'bag2': mix94,
    }
};

function main() {

    const suite = init(['A', 'B']);

    let result;

    result = update(suite, ['bag1', 'yellow']);
    result = update(suite, ['bag2', 'green']);

    console.log(result);
}

main();
