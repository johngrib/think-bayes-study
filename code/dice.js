// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function init(hypos) {
    const dict = {};
    hypos.forEach((h) => {
        dict[h] = 1;
    });
    return dict;
}

// 모든 가설을 돌며 mix의 data에 해당하는 값을 곱해 업데이트한다
function update(dict, data) {

    Object.keys(dict).forEach((hypo) => {
        dict[hypo] = dict[hypo] * likelihood(hypo, data);
    });

    return normalize(dict);
}

// p(D | H_n)
function likelihood(hypo, data) {
    if (hypo < data) {
        return 0;
    }
    return 1 / hypo;
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

    const hypos = [4, 6, 8, 12, 20];
    const pmf = init(hypos);
    const result = update(pmf, 6);
    console.log(result);
}

main();
