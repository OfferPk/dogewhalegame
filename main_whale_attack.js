// Main whale attack animation
const mainWhaleAttackFrames = [
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

// Animation function for main whale attack
function animateMainWhaleAttack(ctx, whale, frameCount, isAttacking) {
    // If not attacking, use regular swim animation
    if (!isAttacking) {
        animateMainWhaleSwim(ctx, whale, frameCount);
        return;
    }
    
    // Save context state
    ctx.save();
    
    // Translate to whale center
    ctx.translate(whale.x + whale.width / 2, whale.y + whale.height / 2);
    
    // Get current animation frame
    const frameIndex = Math.floor(frameCount / 4) % mainWhaleAttackFrames.length;
    const frame = mainWhaleAttackFrames[frameIndex];
    
    // Draw attack glow effect
    if (frame.glowIntensity > 0) {
        ctx.save();
        ctx.globalAlpha = frame.glowIntensity * 0.7;
        ctx.shadowBlur = 15 * frame.glowIntensity;
        ctx.shadowColor = '#FFD700';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, whale.width * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Draw whale body
    ctx.drawImage(
        playerImage, 
        -whale.width / 2, 
        -whale.height / 2, 
        whale.width, 
        whale.height
    );
    
    // Draw mouth with animation (opening wider)
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.arc(whale.width / 2 - 5, 0, 5 + frame.mouthOpen, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes with animation (getting larger/brighter)
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(whale.width / 4, -whale.height / 4, 3 * frame.eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(whale.width / 4, whale.height / 4, 3 * frame.eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw attack particles
    if (frame.glowIntensity > 0.5) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
        for (let i = 0; i < 5; i++) {
            const particleX = whale.width / 2 + 10 + (i * 3);
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
