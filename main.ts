#! /usr/bin/env node

import inquirer from "inquirer";



let name = await inquirer.prompt({
    name:"playername",
    type:"input",
    message:"What is your name"
})

// -----------------------------------------   Enemy variables

let enemies = ["Skeleton","Zombie","Warrior","Army"]
let maxEnemyHealth = 75
let enemyAttackDamage = 25


// ----------------------------------------   player variables

let playerHealth = 100
let playerAttackDamage = 50
let healthPotions = 3
let potionHeals = 30
let potionDropChance = 50


// -------------------------------------- Loop 

let gameRunning = true

console.log("Welcome To Dead Zone " + name.playername);


myGame: 
while(gameRunning)
{
    let enemyRandomHealth = Math.floor(Math.random() * maxEnemyHealth + 1)
    let enemyIndex = Math.floor(Math.random() * enemies.length)
    let enemy = enemies[enemyIndex]

    console.log(`-- ${enemy} has appeared -- \n `);
    
    while(enemyRandomHealth > 0)
    {
        console.log(`-- ${name.playername} Health: ${playerHealth}`);
        console.log(`-- ${enemy} Health: ${enemyRandomHealth}`);

        let playerAction = await inquirer.prompt([
            {
                name:"action",
                type:"list",
                message:"What would you like to do?",
                choices:["Attack","Drink Potion","Run"]
            }
        ])

        if(playerAction.action === "Attack")
        {
            let damageOfEnemy = Math.floor(Math.random() * playerAttackDamage + 1)
            let damageToPlayer = Math.floor(Math.random() * enemyAttackDamage + 1)

            enemyRandomHealth -= damageOfEnemy
            playerHealth -= damageToPlayer

            console.log(`-- You strike the ${enemy} for ${damageOfEnemy} damage`);
            console.log(`-- You recieve ${damageToPlayer} damage `);
        
        if(playerHealth < 1)
        {
            console.log(`-- You have taken too much damage, you are too weak to go on`);
        }
        
        }
        else if(playerAction.action === "Drink Potion")
        {
            if(healthPotions > 0)
            {
                playerHealth += potionHeals
                healthPotions--
                console.log(`-- You drink a potion, healing yourself for ${potionHeals}.\nYour Current health Is ${playerHealth}\n. You have ${healthPotions} potion(s) left`);
            }
            else
            {
                console.log(`-- You have no potions left`);
            }
        }

        else if(playerAction.action === "Run")
        {
            console.log(`-- You run away from the ${enemy}`);
            continue myGame
        }
    }


    if(playerHealth < 1)
    {
        console.log(`-***- You Got defeated By ${enemy} -***-`);
        break;
    }
    console.log(`\n\n-****- You defeated the ${enemy} -****-`);
    console.log(`-- You have ${playerHealth} HP left`);

    let randomNumber = Math.floor(Math.random() * 100 + 1)

    if(randomNumber < potionDropChance)
    {
        healthPotions++
        console.log(`-- The ${enemy} dropped a potion`);
        console.log(`-- You have ${healthPotions} potion(s)`);
    }

    let userOptions = await inquirer.prompt([
        {
            name:"continue",
            type:"list",
            message:"What would you like to do?",
            choices:["Continue Game","Exit Game"]
        }
    ])

    if(userOptions.continue === "Continue Game")
    {
        continue myGame
    }
    else if(userOptions.continue === "Exit Game")
    {
        gameRunning = false
    }

    console.log("\n\n****************************Thank You For PLaying************************************************");
    
}
