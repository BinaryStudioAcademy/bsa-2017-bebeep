/**
 * Generate pagination
 *
 * @param {Number} currentPage
 * @param {Number} totalSize
 * @param {Number} pageLimit
 * @param {function} linkGenerator - (pageNumber, uniqueKey, name, disabled)
 */
export const PageGenerator = (currentPage, totalSize, pageLimit, linkGenerator) => {
    let current = currentPage,
        last = Math.ceil(totalSize / pageLimit),
        delta = 1,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(linkGenerator(l + 1, current, false));
            } else if (i - l !== 1) {
                rangeWithDots.push(linkGenerator('...', current, true));
            }
        }
        rangeWithDots.push(linkGenerator(i, current, false));
        l = i;
    }
    return rangeWithDots;
};