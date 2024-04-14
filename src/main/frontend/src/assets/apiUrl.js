var dev = false; // 배포 시 반드시 false로 바꿔줘야 함

const apiUrl = dev ? 'http://localhost:3000' : 'http://toyple.net';

export default apiUrl;