function cleanCourseData(course) {
    const scoreStr = String(course.score ?? "").replace(/^\s+|\s+$/g, '');
    const score = Number(scoreStr);
    const credit = Number(course.credit);

    if (isNaN(score) || score < 0 || score > 100 || isNaN(credit) || credit <= 0) {
        console.warn(`【非法数据】课程${course.name}，丢弃`);
        return null;
    }
    return {
        name: course.name.trim(),
        score: score,
        credit: credit,
        gpa: getGpaByScore(score)
    }
}
function getGpaByScore(score) {
    if (score >= 90) return 4.0;
    if (score >= 85) return 3.7;
    if (score >= 82) return 3.3;
    if (score >= 78) return 3.0;
    if (score >= 75) return 2.7;
    if (score >= 72) return 2.3;
    if (score >= 68) return 2.0;
    if (score >= 64) return 1.5;
    if (score >= 60) return 1.0;
    return 0;
}

function calcGpaResult(validCourses) {
    const total = validCourses.reduce((acc, item) => {
        acc.totalCredit += item.credit;
        acc.totalScoreCredit += item.score * item.credit;
        acc.totalGpaCredit += item.gpa * item.credit;
        return acc;
    }, { totalCredit: 0, totalScoreCredit: 0, totalGpaCredit: 0 });

    const avgScore = total.totalCredit === 0 ? 0 : total.totalScoreCredit / total.totalCredit;
    const weightedGpa = total.totalCredit === 0 ? 0 : total.totalGpaCredit / total.totalCredit;
    return {
        totalCredit: total.totalCredit,
        avgScore: avgScore.toFixed(2),
        weightedGpa: weightedGpa.toFixed(2)
    }
}