export const formatToIndianTime = (dateString: Date | string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short', // 'Tue'
        day: '2-digit',   // '14'
        month: 'short',   // 'May'
        year: 'numeric',  // '2024'
        timeZone: 'Asia/Kolkata', // Indian Standard Time
    };

    const formatter = new Intl.DateTimeFormat('en-IN', options);
    return formatter.format(date);
};