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

function range(start, size) {
    return [...Array(size).keys()].map((n) => n + start);
}

function main(max) {
    const hypos = range(1, max);
    const pmf = init(hypos);

    let result = update(pmf, 60);
    result = update(pmf, 30);
    result = update(pmf, 90);

    const result2 = normalize(result);
    const rs = Object.keys(result2).reduce((a, b) => {
        return a + (b * result2[b])
    }, 0);
    console.log(rs);
}

main(500);
main(1000);
main(2000);
