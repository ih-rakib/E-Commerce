export const formateDate = (isoDate) => {
    if (!isoDate) return '—';
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Correctly-spelled alias (keep old name for backwards compatibility)
export const formatDate = formateDate;