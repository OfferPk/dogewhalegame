// Enemy whale swimming animation
const enemyWhaleSwimFrames = [
    {
        tailAngle: 15,
        finOffset: 2,
        bubbleCount: 1
    },
    {
        tailAngle: 5,
        finOffset: 1,
        bubbleCount: 0
    },
    {
        tailAngle: 0,
        finOffset: 0,
        bubbleCount: 0
    },
    {
        tailAngle: -5,
        finOffset: -1,
        bubbleCount: 2
    },
    {
        tailAngle: -15,
        finOffset: -2,
        bubbleCount: 1
    },
    {
        tailAngle: -5,
        finOffset: -1,
        bubbleCount: 0
    },
    {
        tailAngle: 0,
        finOffset: 0,
        bubbleCount: 0
    },
    {
        tailAngle: 5,
        finOffset: 1,
        bubbleCount: 1
    }
];

// Animation function for enemy whale swimming
function animateEnemyWhaleSwim(ctx, enemy, frameCount) {
    // Save context state
    ctx.save();
    
    // Translate to enemy center
    ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    
    // Flip horizontally to face the player (enemy whales face left)
    ctx.scale(-1, 1);
    
    // Get current animation frame
    const frameIndex = Math.floor((frameCount + enemy.id * 3) / 8) % enemyWhaleSwimFrames.length;
    const frame = enemyWhaleSwimFrames[frameIndex];
    
    // Draw enemy body
    ctx.drawImage(
        enemyImageObjects[enemy.imageIndex], 
        -enemy.width / 2, 
        -enemy.height / 2, 
        enemy.width, 
        enemy.height
    );
    
    // Draw tail with animation
    ctx.save();
    ctx.translate(-enemy.width / 2, 0);
    ctx.rotate(frame.tailAngle * Math.PI / 180);
    
    // Draw tail (simplified representation)
    ctx.fillStyle = '#FF5252'; // Red color matching most enemy whales
    if (enemy.imageIndex >= 3 && enemy.imageIndex <= 5) {
        ctx.fillStyle = '#FF8C00'; // Orange for orange whales
    } else if (enemy.imageIndex === 7) {
        ctx.fillStyle = '#00BFFF'; // Blue for blue whale
    }
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-15, 0);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // Draw fin with animation
    ctx.fillStyle = ctx.fillStyle; // Same color as tail
    ctx.beginPath();
    ctx.moveTo(0, -enemy.height / 2);
    ctx.lineTo(5, -enemy.height / 2 - 8 + frame.finOffset);
    ctx.lineTo(10, -enemy.height / 2);
    ctx.closePath();
    ctx.fill();
    
    // Draw bubbles if needed
    if (frame.bubbleCount > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < frame.bubbleCount; i++) {
            const bubbleX = -enemy.width / 2 - 10 - (i * 5);
            const bubbleY = (Math.random() - 0.5) * 10;
            const bubbleSize = 2 + Math.random() * 3;
            
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Restore context state
    ctx.restore();
}
