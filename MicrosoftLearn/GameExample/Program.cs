Random dice1 = new();

int roll = dice1.Next(1,6);
int roll2 = dice1.Next(1,6);
int roll3 = dice1.Next(1,6);

int total = roll + roll2 + roll3;

if (roll == roll2 || roll == roll3 || roll2 == roll3){

    if (roll == roll2 && roll == roll3){
        total += 6;
        Console.WriteLine("Todos os dados iguais !! +6 pontos");
    }
    else{
        total += 2;
        Console.WriteLine("Dados iguais !! +2 pontos");
    }
}

Console.WriteLine($"Dice Roll: {roll} + {roll2} + {roll3} = {total}" );

if (total >= 16)
{
    Console.WriteLine("You win a new car!");
}
else if (total >= 10)
{
    Console.WriteLine("You win a new laptop!");
}
else if (total == 7)
{
    Console.WriteLine("You win a trip for two!");
}
else
{
    Console.WriteLine("You win a kitten!");
}
