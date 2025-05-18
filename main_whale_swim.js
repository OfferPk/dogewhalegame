// Main whale swimming animation
const mainWhaleSwimFrames = [
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
        bubbleCount: 2
    },
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
        bubbleCount: 1
    }
];

// Animation function for main whale swimming
function animateMainWhaleSwim(ctx, whale, frameCount) {
    // Save context state
    ctx.save();
    
    // Translate to whale center
    ctx.translate(whale.x + whale.width / 2, whale.y + whale.height / 2);
    
    // Get current animation frame
    const frameIndex = Math.floor(frameCount / 8) % mainWhaleSwimFrames.length;
    const frame = mainWhaleSwimFrames[frameIndex];
    
    // Draw whale body
    ctx.drawImage(
        playerImage, 
        -whale.width / 2, 
        -whale.height / 2, 
        whale.width, 
        whale.height
    );
    
    // Draw tail with animation
    ctx.save();
    ctx.translate(-whale.width / 2, 0);
    ctx.rotate(frame.tailAngle * Math.PI / 180);
    
    // Draw tail (simplified representation)
    ctx.fillStyle = '#FFD700'; // Yellow color matching the whale
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-15, 0);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // Draw fin with animation
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(0, -whale.height / 2);
    ctx.lineTo(5, -whale.height / 2 - 8 + frame.finOffset);
    ctx.lineTo(10, -whale.height / 2);
    ctx.closePath();
    ctx.fill();
    
    // Draw bubbles if needed
    if (frame.bubbleCount > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < frame.bubbleCount; i++) {
            const bubbleX = -whale.width / 2 - 10 - (i * 5);
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
