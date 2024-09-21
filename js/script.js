/**
@author Yehison Cieza
@date 21/09/2024
@version 1
@descriptionEste Utiliza JavaScript para dibujar pétalos, un tallo, hojas y el centro del girasol, 
 * además de añadir una animación en la que las hojas oscilan suavemente, simulando el 
 * efecto del viento. 
 */

const canvas = document.getElementById('girasolCanvas');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height /3+20;
        const numPetalos = 20;
        let angle = 0;
        let leafOscillationAngle = 0;  // Ángulo para la oscilación de las hojas

        // Función para dibujar pétalos
        function dibujarPetalo(x, y, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            const gradient = ctx.createLinearGradient(0, 0, 0, -80);
            gradient.addColorStop(0, 'gold');
            gradient.addColorStop(1, 'orange');

            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; // Sombra más marcada
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(20, -80, 40, -80, 25, 0);
            ctx.bezierCurveTo(40, 80, 20, 80, 0, 0);
            ctx.fill();
            ctx.restore();
        }

        // Función para dibujar el tallo
        function dibujarTallo() {
            ctx.fillStyle = 'green';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 4;
            ctx.fillRect(centerX - 10, centerY + 40, 20, 250);

            // Línea de luz en el tallo
            ctx.strokeStyle = 'lightgreen';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 40);
            ctx.lineTo(centerX, centerY + 290);
            ctx.stroke();
        }

        // Función para dibujar hojas con oscilación
        function dibujarHoja(x, y, rotation, oscillation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation + oscillation);  // Añadimos el ángulo de oscilación

            const gradient = ctx.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, 'darkgreen');
            gradient.addColorStop(1, 'lightgreen');

            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 10;

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(50, -30, 100, 30, 0, 100);
            ctx.bezierCurveTo(-100, 30, -50, -30, 0, 0);
            ctx.fill();

            // Borde dentado de la hoja
            ctx.strokeStyle = 'darkgreen';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i <= 100; i += 10) {
                ctx.lineTo(Math.sin(i) * 10, i); // Dientes del borde
            }
            ctx.stroke();

            // Vena central de la hoja
            ctx.strokeStyle = 'darkolivegreen';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 100);
            ctx.stroke();

            ctx.restore();
        }

        // Función para dibujar el girasol
        function dibujarGirasol() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar el tallo
            dibujarTallo();

            // Dibujar las hojas con oscilación para simular el viento
            const leafOscillation = Math.sin(leafOscillationAngle) * 0.1;  // Oscilación suave
            dibujarHoja(centerX - 60, centerY + 180, -Math.PI / 3, leafOscillation); // Hoja izquierda
            dibujarHoja(centerX + 60, centerY + 180, Math.PI / 3, leafOscillation);  // Hoja derecha

            // Dibujar los pétalos
            for (let i = 0; i < numPetalos; i++) {
                const rotation = (i * Math.PI * 2) / numPetalos + angle;
                const petaloX = centerX + Math.cos(rotation) * 39;
                const petaloY = centerY + Math.sin(rotation) * 39;
                dibujarPetalo(petaloX, petaloY, rotation);
            }

            // Dibujar el centro del girasol
            ctx.fillStyle = 'brown';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
            ctx.fill();

            // Dibujar las semillas
            const seeds = 100;
            for (let i = 0; i < seeds; i++) {
                const seedAngle = (i * Math.PI * 2) / seeds;
                const seedRadius = Math.random() * 10 + 15;
                const seedX = centerX + Math.cos(seedAngle) * seedRadius;
                const seedY = centerY + Math.sin(seedAngle) * seedRadius;
                ctx.fillStyle = 'darkorange';
                ctx.beginPath();
                ctx.arc(seedX, seedY, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Dibujar texto "Para ti" encima del girasol
            ctx.fillStyle = '#960909';
            ctx.font = '48px Arial Black';
            ctx.textAlign = 'center';
            ctx.fillText('For you', centerX, 150); // Posiciona el texto arriba del girasol
        }

        // Animar el girasol
        function animar() {
            angle += 0.01;
            leafOscillationAngle += 0.05;  // Incrementamos el ángulo para la animación de las hojas
            dibujarGirasol();
            requestAnimationFrame(animar);
        }

        animar();