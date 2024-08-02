export function countDown () {
    document.addEventListener('DOMContentLoaded', (event) => {
        const countdownTime = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
        const endTime = new Date().getTime() + countdownTime;
    
        function startCountdown() {
            const timerInterval = setInterval(() => {
                const now = new Date().getTime();
                const remainingTime = endTime - now;
    
                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
                document.getElementById('days').textContent = String(days).padStart(2, '0');
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
                if (remainingTime < 0) {
                    clearInterval(timerInterval);
                    document.getElementById('countdown').innerHTML = 'EXPIRED';
                }
            }, 1000);
        }
    
        startCountdown();
    });
}
