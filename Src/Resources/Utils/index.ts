export class Utils {
    public static wait(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public static parseTime(string: string): number {
        const time = string.match(/([0-9]+(\.\d+)?[dDhHmMsS])/g);
        if (!time) return 0;
        let ms = 0;
        for (const t of time) {
            const unit = t[t.length - 1].toLowerCase();
            const amount = Number(t.slice(0, -1));
            if (unit === 'd') ms += amount * 24 * 60 * 60 * 1000;
            else if (unit === 'h') ms += amount * 60 * 60 * 1000;
            else if (unit === 'm') ms += amount * 60 * 1000;
            else if (unit === 's') ms += amount * 1000;
            else ms += amount * 1000;
        }
        return ms;
    }


    /**
     * Format the time from ms => human readable :: ex: 2hours, 10minutes, 1second / Track Style => HH:MM:SS.
     *
     * @param {number} uptime - The time in milliseconds.
     * @param {boolean} [x] - Optional parameter. If true, the time will be formatted in the style of HH:MM:SS.
     * @returns {string} The formatted time string.
     */


    public static formatTime(uptime: number, x?: Boolean): string {
        const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((uptime / (60 * 60 * 1000)) % 24);
        const minutes = Math.floor((uptime / (60 * 1000)) % 60);
        const seconds = Math.floor((uptime / 1000) % 60);

        const formattedDays = days > 0 ? `${days}d ` : '';
        const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedDays}${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }

    public static uptimeFormat(uptime: number): string {
        const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((uptime / (60 * 60 * 1000)) % 24);
        const minutes = Math.floor((uptime / (60 * 1000)) % 60);
        const seconds = Math.floor((uptime / 1000) % 60);
      
        const parts = [];
        if (days > 0) parts.push(`${days} Days,`);
        if (hours > 0) parts.push(`${hours} Hours,`);
        if (minutes > 0) parts.push(`${minutes} Minutes,`);
        if (seconds > 0) parts.push(`${seconds} Seconds`);
      
        return parts.join(" ");
      }
      
}