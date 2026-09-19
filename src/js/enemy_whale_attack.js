// Enemy whale attack animation
const enemyWhaleAttackFrames = [
    {
        mouthOpen: 0,
        eyeSize: 1,
        glowIntensity: 0
    },
    {
        mouthOpen: 5,
        eyeSize: 1.2,
        glowIntensity: 0.2
    },
    {
        mouthOpen: 10,
        eyeSize: 1.5,
        glowIntensity: 0.5
    },
    {
        mouthOpen: 15,
        eyeSize: 1.8,
        glowIntensity: 0.8
    },
    {
        mouthOpen: 20,
        eyeSize: 2,
        glowIntensity: 1
    },
    {
        mouthOpen: 15,
        eyeSize: 1.8,
        glowIntensity: 0.8
    },
    {
        mouthOpen: 10,
        eyeSize: 1.5,
        glowIntensity: 0.5
    },
    {
        mouthOpen: 5,
        eyeSize: 1.2,
        glowIntensity: 0.2
    }
];

// Animation function for enemy whale attack
function animateEnemyWhaleAttack(ctx, enemy, frameCount, isAttacking) {
    // If not attacking, use regular swim animation
    if (!isAttacking) {
        animateEnemyWhaleSwim(ctx, enemy, frameCount);
        return;
    }
    
    // Save context state
    ctx.save();
    
    // Translate to enemy center
    ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    
    // Flip horizontally to face the player (enemy whales face left)
    ctx.scale(-1, 1);
    
    // Get current animation frame
    const frameIndex = Math.floor(frameCount / 4) % enemyWhaleAttackFrames.length;
    const frame = enemyWhaleAttackFrames[frameIndex];
    
    // Determine color based on enemy type
    let enemyColor = '#FF5252'; // Red color matching most enemy whales
    if (enemy.imageIndex >= 3 && enemy.imageIndex <= 5) {
        enemyColor = '#FF8C00'; // Orange for orange whales
    } else if (enemy.imageIndex === 7) {
        enemyColor = '#00BFFF'; // Blue for blue whale
    }
    
    // Draw attack glow effect
    if (frame.glowIntensity > 0) {
        ctx.save();
        ctx.globalAlpha = frame.glowIntensity * 0.7;
        ctx.shadowBlur = 15 * frame.glowIntensity;
        ctx.shadowColor = enemyColor;
        ctx.fillStyle = `rgba(${hexToRgb(enemyColor)}, 0.3)`;
        ctx.beginPath();
        ctx.arc(0, 0, enemy.width * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Draw enemy body
    ctx.drawImage(
        enemyImageObjects[enemy.imageIndex], 
        -enemy.width / 2, 
        -enemy.height / 2, 
        enemy.width, 
        enemy.height
    );
    
    // Draw mouth with animation (opening wider)
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.arc(enemy.width / 2 - 5, 0, 5 + frame.mouthOpen, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes with animation (getting larger/brighter)
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(enemy.width / 4, -enemy.height / 4, 3 * frame.eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(enemy.width / 4, enemy.height / 4, 3 * frame.eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw attack particles
    if (frame.glowIntensity > 0.5) {
        ctx.fillStyle = `rgba(${hexToRgb(enemyColor)}, 0.7)`;
        for (let i = 0; i < 5; i++) {
            const particleX = enemy.width / 2 + 10 + (i * 3);
            const particleY = (Math.random() - 0.5) * 20;
            const particleSize = 2 + Math.random() * 3;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Restore context state
    ctx.restore();
}

// Helper function to convert hex color to rgb
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
}
