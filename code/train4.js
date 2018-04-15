// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function init(hypos) {
    const dict = {};
    const alpha = 1
    hypos.forEach((h) => {
        dict[h] = Math.pow(h, -alpha);
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

    const keys = Object.keys(result2);

    let p5 = 0;
    let p5total = 0;
    for(let i = 0; i < keys.length; i++) {
        const val = keys[i];
        const prob = result2[val];
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
        const prob = result2[val];
        p95total += prob;
        if (p95total >= 0.95) {
            p95 = val;
            break;
        }
    }
    console.log({ '5%': p5, '95%': p95});
}

main(500);
main(1000);
main(2000);
