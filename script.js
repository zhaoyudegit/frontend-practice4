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