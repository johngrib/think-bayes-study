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
        const like = likelihood(p, hypo, dataName);

        // p(H_dataName) * p(D | H_dataName)
        p[hypo] = p[hypo] * likelihood(p, hypo, dataName);
    });

    return normalize(p);
}

// p(D | H_dataName)
function likelihood(dict, hypo, dataName) {
    if (hypo == dataName) {
        return 0;
    }
    // p(D | H_a)
    if (hypo == 'A') {
        return 1/2;
    }
    return 1;
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

function main() {

    const hypos = ['A', 'B', 'C'];
    const pmf = init(hypos);
    const result = update(pmf, 'B');
    console.log(result);
}

main();
