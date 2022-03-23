export const getURLParam = (paramName) => {
    const urlParams = new URLSearchParams(window.location.search);

    return parseInt(urlParams.get(paramName));
}