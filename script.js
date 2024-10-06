<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar System</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="solarSystem"></canvas>
    <script>
        const canvas = document.getElementById('solarSystem');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const sun = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 50,
            color: '#FDB813'
        };

        const planets = [
            { name: 'Mercury', radius: 10, orbitRadius: 100, angle: 0, speed: 0.02, color: '#8C7853' },
            { name: 'Venus', radius: 15, orbitRadius: 150, angle: 0, speed: 0.015, color: '#FFA500' },
            { name: 'Earth', radius: 16, orbitRadius: 200, angle: 0, speed: 0.01, color: '#4169E1' },
            { name: 'Mars', radius: 12, orbitRadius: 250, angle: 0, speed: 0.008, color: '#FF4500' },
            { name: 'Jupiter', radius: 30, orbitRadius: 350, angle: 0, speed: 0.005, color: '#DEB887' },
            { name: 'Saturn', radius: 25, orbitRadius: 450, angle: 0, speed: 0.003, color: '#F4A460' },
            { name: 'Uranus', radius: 20, orbitRadius: 520, angle: 0, speed: 0.002, color: '#87CEEB' },
            { name: 'Neptune', radius: 18, orbitRadius: 580, angle: 0, speed: 0.001, color: '#4682B4' }
        ];

        const planetImages = [
            { name: 'Mercury', src: 'images/mercury.png' },
            { name: 'Venus', src: 'images/venus.png' },
            { name: 'Earth', src: 'images/earth.png' },
            { name: 'Mars', src: 'images/mars.png' },
            { name: 'Jupiter', src: 'images/jupiter.png' },
            { name: 'Saturn', src: 'images/saturn.png' },
            { name: 'Uranus', src: 'images/uranus.png' },
            { name: 'Neptune', src: 'images/neptune.png' }
        ];

        const loadedImages = {};

        function loadImages() {
            planetImages.forEach(planet => {
                const img = new Image();
                img.src = planet.src;
                img.onload = () => {
                    loadedImages[planet.name] = img;
                };
            });
        }

        loadImages();

        function drawLuminousSun() {
            const gradient = ctx.createRadialGradient(
                sun.x, sun.y, sun.radius * 0.2,
                sun.x, sun.y, sun.radius * 1.5
            );
            gradient.addColorStop(0, 'rgba(253, 184, 19, 1)');
            gradient.addColorStop(0.4, 'rgba(253, 184, 19, 0.8)');
            gradient.addColorStop(1, 'rgba(253, 184, 19, 0)');

            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
            ctx.fillStyle = sun.color;
            ctx.fill();
        }

        const satellite = {
            x: 0,
            y: 0,
            radius: 5,
            orbitRadius: 230,
            angle: 0,
            speed: 0.02,
            color: '#FFFFFF'
        };

        const saturnRings = {
            innerRadius: 28,
            outerRadius: 35,
            color: 'rgba(210, 180, 140, 0.6)'
        };

        planets[5].hasRings = true;
        planets[5].rings = saturnRings;

        function drawSatellite() {
            satellite.x = sun.x + Math.cos(satellite.angle) * satellite.orbitRadius;
            satellite.y = sun.y + Math.sin(satellite.angle) * satellite.orbitRadius;

            ctx.beginPath();
            ctx.arc(satellite.x, satellite.y, satellite.radius, 0, Math.PI * 2);
            ctx.fillStyle = satellite.color;
            ctx.fill();

            satellite.angle += satellite.speed;
        }

        function drawPlanet(planet, index) {
            planet.angle += planet.speed;
            const x = sun.x + Math.cos(planet.angle) * planet.orbitRadius;
            const y = sun.y + Math.sin(planet.angle) * planet.orbitRadius;

            ctx.save();
            ctx.translate(x, y);

            if (loadedImages[planet.name]) {
                ctx.drawImage(loadedImages[planet.name], -planet.radius, -planet.radius, planet.radius * 2, planet.radius * 2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
                ctx.fillStyle = planet.color;
                ctx.fill();
            }

            if (planet.hasRings) {
                ctx.beginPath();
                ctx.ellipse(0, 0, planet.rings.outerRadius, planet.rings.outerRadius / 3, 0, 0, Math.PI * 2);
                ctx.strokeStyle = planet.rings.color;
                ctx.lineWidth = planet.rings.outerRadius - planet.rings.innerRadius;
                ctx.stroke();
            }

            ctx.restore();
        }

        function drawOrbit(radius) {
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.stroke();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawLuminousSun();

            planets.forEach((planet, index) => {
                drawOrbit(planet.orbitRadius);
                drawPlanet(planet, index);
            });

            drawSatellite();

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            sun.x = canvas.width / 2;
            sun.y = canvas.height / 2;
        });
    </script>
</body>
</html>
