function dot(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function norm(a) {
    return Math.sqrt(dot(a, a));
}

export function cosineSimiliarity(a, b) {
    return dot(a, b) / (norm(a) * norm(b));
}