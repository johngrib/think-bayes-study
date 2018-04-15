// 사전 분포
const pmf = {
    'Bowl1': (1/2), // p(B_1)
    'Bowl2': (1/2), // p(B_2)
};

// likelihood(우도, 가능도)
const pvb1 = (3/4);
const pvb2 = (1/2);

// p(B_1) * p(V|B_1)
// p(B_2) * p(V|B_2)
pmf['Bowl1'] = pmf['Bowl1'] * pvb1;
pmf['Bowl2'] = pmf['Bowl2'] * pvb2;

function normalize(dict) {
    const values = Object.values(dict);
    const sum = values.reduce((a, b) => a + b);
    const result = {};
    Object.keys(dict).forEach((key) => {
        result[key] = dict[key] / sum;
    });
    return result;
}

console.log(normalize(pmf)['Bowl1']);
