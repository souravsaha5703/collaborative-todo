export const verifyEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

export const verifyFullName = (name: string): boolean => {
    const fullNameRegex = /^[a-zA-Z]+(?:[-' ]?[a-zA-Z]+)*$/;

    return fullNameRegex.test(name);
}

export const safeNumber = (str: string | number): number => {
    const num = Number(str);
    return isNaN(num) ? 0 : num;
}