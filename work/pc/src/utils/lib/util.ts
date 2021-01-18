export function getPageTitle(pageTitle: string):string {
    const title = '柯明教育';
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}

export default {
    getPageTitle
}