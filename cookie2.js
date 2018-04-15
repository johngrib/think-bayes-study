// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function Cookie(hypos) {
    const dict = {};
    hypos.forEach((h) => {
        dict[h] = 1;
    });
    return dict;
}

// 모든 가설을 돌며 mix의 dataName에 해당하는 값을 곱해 업데이트한다
function update(dict, mix, dataName) {

    Object.keys(dict).forEach((key) => {
        dict[key] = dict[key] * mix[key][dataName];
    });

    return normalize(dict);
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

function main() {

    const mix = {
        'Bowl1': {
            'vanilla': 3/4,
            'chocolate': 1/4,
        },
        'Bowl2': {
            'vanilla': 1/2,
            'chocolate': 1/2,
        }
    };

    const hypos = ['Bowl1', 'Bowl2'];
    const pmf = Cookie(hypos);
    const result = update(pmf, mix, 'vanilla');
    console.log(result);
}

main();
