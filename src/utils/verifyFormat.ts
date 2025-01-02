export const verifyEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

export const verifyFullName = (name: string): boolean => {
    const fullNameRegex = /^[a-zA-Z]+(?:[-' ]?[a-zA-Z]+)*$/;

    return fullNameRegex.test(name);
}