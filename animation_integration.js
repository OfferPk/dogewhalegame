// Animation integration module
// This file integrates all whale animations into the game

// Animation state tracking
let frameCount = 0;
let mainWhaleAttacking = false;
let enemyAttackingStates = {};

// Main function to update animation frame counter
function updateAnimations() {
    frameCount++;
    
    // Reset main whale attack state if needed
    if (mainWhaleAttacking && frameCount % 32 === 0) {
        mainWhaleAttacking = false;
    }
    
    // Update enemy attack states
    for (const enemyId in enemyAttackingStates) {
        if (enemyAttackingStates[enemyId].attacking) {
            enemyAttackingStates[enemyId].timer--;
            if (enemyAttackingStates[enemyId].timer <= 0) {
                enemyAttackingStates[enemyId].attacking = false;
            }
        }
    }
}

// Function to trigger main whale attack animation
function triggerMainWhaleAttack() {
    mainWhaleAttacking = true;
}

// Function to trigger enemy whale attack animation
function triggerEnemyWhaleAttack(enemyId) {
    if (!enemyAttackingStates[enemyId]) {
        enemyAttackingStates[enemyId] = { attacking: false, timer: 0 };
    }
    
    enemyAttackingStates[enemyId].attacking = true;
    enemyAttackingStates[enemyId].timer = 32; // Animation duration in frames
}

// Override the original draw functions with animated versions

// Original drawPlayer function replacement
function drawPlayerAnimated() {
    // Check if attacking (when firing)
    if (mainWhaleAttacking) {
        animateMainWhaleAttack(ctx, player, frameCount, true);
    } else {
        animateMainWhaleSwim(ctx, player, frameCount);
    }
}

// Original drawEnemies function replacement
function drawEnemiesAnimated() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        
        // Assign an ID if not present
        if (enemy.id === undefined) {
            enemy.id = i + 1000; // Unique ID
        }
        
        // Check if this enemy is attacking
        const isAttacking = enemyAttackingStates[enemy.id] && 
                           enemyAttackingStates[enemy.id].attacking;
        
        if (isAttacking) {
            animateEnemyWhaleAttack(ctx, enemy, frameCount, true);
        } else {
            animateEnemyWhaleSwim(ctx, enemy, frameCount);
        }
    }
}

// Hook into the fireProjectile function to trigger attack animation
const originalFireProjectile = fireProjectile;
fireProjectile = function() {
    triggerMainWhaleAttack();
    originalFireProjectile();
};

// Hook into the fireEnemyProjectile function to trigger enemy attack animation
const originalFireEnemyProjectile = fireEnemyProjectile;
fireEnemyProjectile = function(enemy, speedX, speedY) {
    triggerEnemyWhaleAttack(enemy.id);
    originalFireEnemyProjectile(enemy, speedX, speedY);
};
