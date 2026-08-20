/**
 * Centralized Date Formatting Utilities (MM/DD/YYYY Standard)
 * Ensures consistent Month-first format across the entire application:
 * e.g. 08/20/2026 or Aug 20, 2026
 */

export function formatDateMMDDYYYY(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '—';

  try {
    let year: number;
    let month: number;
    let day: number;

    if (typeof dateInput === 'string') {
      // Check if it's already YYYY-MM-DD or ISO
      if (dateInput.includes('T')) {
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return dateInput;
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
      } else if (dateInput.includes('-')) {
        const parts = dateInput.split('-');
        if (parts.length >= 3) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        } else {
          return dateInput;
        }
      } else if (dateInput.includes('/')) {
        return dateInput; // already formatted
      } else {
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return dateInput;
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
      }
    } else {
      year = dateInput.getFullYear();
      month = dateInput.getMonth() + 1;
      day = dateInput.getDate();
    }

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return String(dateInput);
    }

    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yyyy = String(year);

    return `${mm}/${dd}/${yyyy}`;
  } catch {
    return String(dateInput);
  }
}

export function formatDateFriendly(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '—';

  try {
    const formatted = formatDateMMDDYYYY(dateInput);
    if (formatted === '—') return '—';

    const [mm, dd, yyyy] = formatted.split('/');
    const monthNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    const monthIdx = parseInt(mm, 10) - 1;
    const mName = monthNames[monthIdx] || mm;

    return `${mName} ${parseInt(dd, 10)}, ${yyyy}`;
  } catch {
    return formatDateMMDDYYYY(dateInput);
  }
}

export function formatDateTimeMMDDYYYY(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '—';
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return formatDateMMDDYYYY(dateInput);
    
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    return `${mm}/${dd}/${yyyy} ${hours}:${minutes} ${ampm}`;
  } catch {
    return formatDateMMDDYYYY(dateInput);
  }
}
